import styled from "styled-components";
import TabContainer from "components/studyCafeDetails/TabContainer";
import { ReactComponent as ThumbsUpIcon } from "assets/icons/thumbsUp.svg";
import ProgressBar from "components/common/ProgressBar";
import StarsGrade from "components/common/StarsGrade";
import ReviewsList from "./ReviewsList";
import Pagination from "components/Pagination";
import { useAllStudyRoomsReviews } from "hooks/queries/useStudyCafeDetails";
import { useState } from "react";

const Reviews = ({ studyCafeId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useAllStudyRoomsReviews({
    studyCafeId,
    page: currentPage,
    size: 3,
  });

  const LIST_ITEMS_PER_PAGE = 3;
  return (
    <TabContainer title={"리뷰"}>
      <RecommendPercentageContainer>
        <div>
          <span>추천해요</span>
          <ThumbsUpIcon />
        </div>
        <ProgressBar
          width={70}
          percentage={data?.totalGradeInfo.recommendationRate}
        />
        <div className="percentage-text">
          {data?.totalGradeInfo.recommendationRate}%
        </div>
      </RecommendPercentageContainer>
      <StarsGradeContainer>
        <section className="left-section">
          <div className="left-section__grade">
            <div>청결도</div>
            <StarsGrade size={3} grade={data?.totalGradeInfo.cleanliness} />
            <div>{data?.totalGradeInfo.cleanliness}점</div>
          </div>
          <div className="left-section__grade">
            <div>방음</div>
            <StarsGrade size={3} grade={data?.totalGradeInfo.deafening} />
            <div>{data?.totalGradeInfo.deafening}점</div>
          </div>
          <div className="left-section__grade">
            <div>비품상태</div>
            <StarsGrade size={3} grade={data?.totalGradeInfo.fixturesStatus} />
            <div>{data?.totalGradeInfo.fixturesStatus}점</div>
          </div>
        </section>
        <section className="right-section">
          <div className="right-section__grade"></div>
          <div className="right-section__grade">
            <div>총점</div>
            <StarsGrade size={3} grade={data?.totalGradeInfo.total} />
            <div>{data?.totalGradeInfo.total}점</div>
          </div>
          <div className="right-section__grade"></div>
        </section>
      </StarsGradeContainer>
      <ReviewsList reviewData={data?.findReviewInfo} />
      <Pagination
        currentPage={1}
        totalPages={parseInt(
          data?.findReviewInfo.length / LIST_ITEMS_PER_PAGE,
          10
        )}
        onPageChange={setCurrentPage}
      />
    </TabContainer>
  );
};

export default Reviews;

const RecommendPercentageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  ${({ theme }) => theme.fonts.heading1Bold};
  span {
    margin-right: 1rem;
  }
  margin-bottom: 5rem;
`;

const StarsGradeContainer = styled.div`
  display: flex;
  gap: 10rem;
  .left-section {
    width: 50%;
    &__grade {
      display: grid;
      grid-template-columns: 0.3fr 0.5fr 0.2fr;
      ${({ theme }) => theme.fonts.heading2};
      margin-bottom: 3.5rem;
    }
  }
  .right-section {
    width: 50%;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    &__grade {
      display: grid;
      grid-template-columns: 0.3fr 0.5fr 0.2fr;
      ${({ theme }) => theme.fonts.heading2Bold};
      margin-bottom: 3.5rem;
    }
  }
  margin-bottom: 10rem;
`;
