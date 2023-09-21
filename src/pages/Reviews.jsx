import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ReviewCafeList from "components/ReviewCafeList";
import DateFilter from "components/DateFilter";
import { GET } from "apis/api";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const navigate = useNavigate();
  const [writableReviews, setWritableReviews] = useState([]);
  const [writtenReviews, setWrittenReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("writable");
  const [selectedDateFilter, setSelectedDateFilter] = useState({
    filter: "1year",
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    endDate: new Date(),
  });

  const IMG_DUMMY_URL =
    "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg";

  useEffect(() => {
    // 작성 가능한 리뷰 목록 가져오기
    axios
      .get(
        "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reviews/available?page=1",
        config
      )
      .then((response) => {
        setWritableReviews(response.data.availableReviewInfo);
      });

    // 작성한 리뷰 목록 가져오기
    // axios
    //   .get(
    //     "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reviews?startDate=2023-09-01&endDate=2023-09-20&page=1",
    //     config
    //   )
    //   .then((response) => {
    //     setWrittenReviews(response.data);
    //   });
  }, []);

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        const tokenWithBearer = cookie.substring(name.length + 1);
        const token = tokenWithBearer.replace("Bearer%20", "");
        return token;
      }
    }
    return null;
  }

  const accessToken = getCookie("accessToken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const StarRating = ({ value }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<Star key={i} filled={i < value} />);
    }
    return <StarContainer>{stars}</StarContainer>;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "writable") {
      axios
        .get(
          "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reviews/available?page=1",
          config
        )
        .then((response) => {
          setWritableReviews(response.data.availableReviewInfo);
        })
        .catch((error) => {
          console.log("writable error", error);
        });
    } else if (tab === "written") {
      axios
        .get(
          "http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/mypage/reviews?startDate=2023-09-01&endDate=2023-09-20&page=1",
          config
        )
        .then((response) => {
          console.log(response.data);
          setWrittenReviews(response.data.writtenReviewInfos);
        })
        .catch((error) => {
          console.log("written error", error);
        });
    }
  };

  const handleWriteReview = (review) => {
    console.log("리뷰 작성 페이지로 이동:", review);
    const { reservationId } = review;
    const writeReviewPath = `/myPage/reviews/${reservationId}/write`;
    navigate(writeReviewPath);
  };

  const handleUpdateReview = (review) => {
    console.log("리뷰 수정 페이지로 이동:", review);
  };

  const handleDeleteReview = (review) => {
    console.log("리뷰 삭제", review);
  };

  const handleDateFilterChange = (dateFilter) => {
    //setSelectedDateFilter(dateFilter);
  };

  // useEffect(() => {
  //   //setWritableReviews([...DUMMY_DATA1]);
  // }, []);

  return (
    <Wrapper>
      <ReviewText>리뷰관리</ReviewText>
      <TabContainer>
        <TabWrapper>
          <TabButton
            active={activeTab === "writable"}
            onClick={() => handleTabChange("writable")}>
            작성 가능한 리뷰
          </TabButton>
          <TabIndicator active={activeTab === "writable"} />
        </TabWrapper>
        <TabWrapper>
          <TabButton
            active={activeTab === "written"}
            onClick={() => handleTabChange("written")}>
            작성한 리뷰
          </TabButton>
          <TabIndicator active={activeTab === "written"} />
        </TabWrapper>
      </TabContainer>
      {activeTab === "writable" ? (
        <>
          {writableReviews.map((review) => (
            <div key={review.id}>
              <ReviewCafeList item={review} />
              <Validdate>{review.validDate}까지 작성 가능</Validdate>
              <WriteButton onClick={() => handleWriteReview(review)}>
                리뷰 작성하기
              </WriteButton>
              <Separator />
            </div>
          ))}
        </>
      ) : (
        <>
          {activeTab === "written"}
          <DateFilter onDateFilter={handleDateFilterChange} />
          {writtenReviews.map((review) => (
            <div key={review.reservationId}>
              <ReviewContainer key={review.reervationId}>
                <CafeInfo>
                  <CafeImage
                    src={review.studycafeInfo.studycafePhoto ?? IMG_DUMMY_URL}
                    alt="스터디카페 이미지"
                  />
                  <CafeDetails>
                    <ReviewInfoCafe>
                      {review.studycafeInfo.studycafeName}
                    </ReviewInfoCafe>
                    <ReviewInfo>
                      이용일자: {review.studycafeInfo.date}
                    </ReviewInfo>
                    <ReviewInfo>{review.studycafeInfo.roomName}</ReviewInfo>
                  </CafeDetails>
                </CafeInfo>
                <SmallDivider></SmallDivider>
                <ReviewInlineInfo>
                  <ReviewStar>
                    <span>청결도</span>{" "}
                    <StarRating value={review.gradeInfo.cleanliness} />
                    <span>방음</span>{" "}
                    <StarRating value={review.gradeInfo.deafening} />
                    <span>비품상태</span>{" "}
                    <StarRating value={review.gradeInfo.fixtureStatus} />
                  </ReviewStar>
                  <ReviewInfoDate>
                    작성 일자: {review.reviewInfo.writedate}
                  </ReviewInfoDate>
                </ReviewInlineInfo>
                <ReviewImageDetail>
                  <ReviewImage
                    src={review.reviewInfo.reviewPhoto ?? IMG_DUMMY_URL}
                    alt="리뷰 이미지"
                  />
                  <ReviewInfoText>{review.reviewInfo.detail}</ReviewInfoText>
                </ReviewImageDetail>
                <ReviewButtonWrapper>
                  <UpdateButton onClick={() => handleUpdateReview(review)}>
                    리뷰 수정
                  </UpdateButton>
                  <UpdateButton onClick={() => handleDeleteReview(review)}>
                    리뷰 삭제
                  </UpdateButton>
                </ReviewButtonWrapper>
                <Divider></Divider>
              </ReviewContainer>
            </div>
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default Reviews;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 6rem 8rem;
`;
const TabIndicator = styled.div`
  height: 0.3rem;
  width: 23.2rem;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.mainDark : theme.colors.gray500};
  position: absolute;
  bottom: 0;
`;
const TabWrapper = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  margin-top: 5rem;
`;
const ReviewText = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold};
  color: ${({ theme }) => theme.colors.gray900};
  font-family: Noto Sans KR;
`;
const TabButton = styled.button`
  ${({ theme }) => theme.fonts.heading2Bold};
  color: ${({ theme, active }) =>
    active ? theme.colors.mainDark : theme.colors.gray500};
  background-color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 3.2rem;
  margin-right: 3rem;
`;
const ReviewContainer = styled.div`
  margin-top: 1.6rem;
  margin-left: 7rem;
  padding: 1.2rem;
`;
const CafeInfo = styled.div`
  display: flex;
  align-items: center;
`;
const CafeImage = styled.img`
  width: 21rem;
  height: 11rem;
  border-radius: 2rem;
  margin-right: 2rem;
`;
const CafeDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReviewInfoCafe = styled.div`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ##000000;
  margin-bottom: 0.5rem;
`;
const ReviewInfo = styled.div`
  ${({ theme }) => theme.fonts.body2Bold};
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 0.5rem;
`;
const SmallDivider = styled.div`
  width: 105rem;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin-top: 1rem;
`;
const ReviewStar = styled.div`
  ${({ theme }) => theme.fonts.body1Bold};
  color: #000000;
  margin-top: 2rem;
  display: flex;
  span {
    margin-right: 1rem;
  }
`;
const ReviewInfoDate = styled.div`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray800};
  width: 12rem;
  margin-left: 24rem;
  margin-top: 2rem;
`;
const ReviewInfoText = styled.div`
  color: #000000;
  font-family: Noto Sans KR;
  ${({ theme }) => theme.fonts.caption1};
  margin-top: 3.5rem;
  width: 30rem;
`;
const Validdate = styled.div`
  font-family: Noto Sans KR;
  ${({ theme }) => theme.fonts.caption1};
  color: ${({ theme }) => theme.colors.gray500};
  margin-left: 88rem;
  margin-top: -18rem;
  margin-bottom: 13rem;
`;
const ReviewButtonWrapper = styled.div`
  display: flex;
  margin-left: 70rem;
`;
const WriteButton = styled.button`
  font-family: Noto Sans KR;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mainDark};
  border: 1px solid #0027b0;
  cursor: pointer;
  width: 15rem;
  height: 4rem;
  border-radius: 12px;
  margin-left: 88rem;
`;
const Separator = styled.div`
  width: 105rem;
  height: 0.1rem;
  margin: 4rem 6rem;
  background-color: ${({ theme }) => theme.colors.gray300};
`;
const Divider = styled.div`
  width: 105rem;
  height: 0.1rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.gray300};
`;
const UpdateButton = styled.button`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mainDark};
  border: 1px solid #0027b0;
  cursor: pointer;
  width: 15rem;
  height: 4rem;
  border-radius: 12px;
  margin-left: 1rem;
`;
const ReviewImage = styled.img`
  width: 25rem;
  height: 14rem;
  border-radius: 1rem;
  margin-top: 2rem;
  margin-right: 3rem;
`;
const ReviewInlineInfo = styled.div`
  display: flex;
`;
const ReviewImageDetail = styled.div`
  display: flex;
`;
const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Star = styled.span`
  font-size: 1.2rem;
  margin-right: 0.2rem;
  color: ${({ filled }) => (filled ? "#ffcd00" : "#d2d2d2")};
`;
