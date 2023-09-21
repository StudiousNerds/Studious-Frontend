import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as GoodIconWhite } from "assets/icons/goodWhite.svg";
import { ReactComponent as GoodIcon } from "assets/icons/good.svg";
import { ReactComponent as BadIconWhite } from "assets/icons/badWhite.svg";
import { ReactComponent as BadIcon } from "assets/icons/bad.svg";
import ReviewCafeList from "components/ReviewCafeList";
import StarRating from "components/review/StarRating";
import HashTagSelector from "components/review/HashTagSelector";
import PhotoUploader from "components/review/PhotoUploader";
import ContentInput from "components/review/ContentInput";
import axios from "axios";
import { POST } from "apis/api";

const ReviewWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const review = location.state.review;

  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [soundproofingRating, setSoundproofingRating] = useState(0);
  const [equipmentRating, setEquipmentRating] = useState(0);

  const [isRecommended, setIsRecommended] = useState(false);
  const [isNotRecommended, setIsNotRecommended] = useState(false);

  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [content, setContent] = useState("");

  const handleCancel = () => {
    navigate("/reviews");
  };

  const handleRecommend = () => {
    setIsRecommended(true);
    setIsNotRecommended(false);
  };

  const handleNotRecommend = () => {
    setIsRecommended(false);
    setIsNotRecommended(true);
  };

  const handleSubmit = async () => {
    const reviewData = {
      cafeId: review.cafeId,
      reservationId: review.reservationId,
      cleanliness: cleanlinessRating,
      deafening: soundproofingRating,
      fixtureStatus: equipmentRating,
      isRecommend: isRecommended,
      hashtags: selectedHashtags,
      photos: selectedPhotos.map((photo) => photo.uri),
      detail: content,
    };

    try {
      const response = await POST("/api/reviews", reviewData);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Wrapper>
      <ReviewText>리뷰 작성</ReviewText>
      <CustomStyledReviewCafeList className="custom-style" item={review} />
      <Separator />

      <ContentWrapper>
        <StarText>별점 입력</StarText>
        <StarRatingWrapper>
          <StarRating
            label="청결도"
            rating={cleanlinessRating}
            onChange={setCleanlinessRating}
          />
          <StarRating
            label="방음"
            rating={soundproofingRating}
            onChange={setSoundproofingRating}
          />
          <StarRating
            label="비품상태"
            rating={equipmentRating}
            onChange={setEquipmentRating}
          />
        </StarRatingWrapper>
        <HashTagSelector setSelectedHashtags={setSelectedHashtags} />
      </ContentWrapper>

      <RecommendContainer>
        <RecommendText>
          다른 사용자들에게 추천하시나요? 의견을 알려주세요.
        </RecommendText>
        <RecommendButtonsWrapper>
          <RecommendButton selected={isRecommended} onClick={handleRecommend}>
            추천 {isRecommended ? <GoodIconWhite /> : <GoodIcon />}
          </RecommendButton>
          <RecommendButton
            selected={isNotRecommended}
            onClick={handleNotRecommend}>
            비추천 {isNotRecommended ? <BadIconWhite /> : <BadIcon />}
          </RecommendButton>
        </RecommendButtonsWrapper>
      </RecommendContainer>

      <PhotoText>사진 선택 </PhotoText>
      <PhotoUploader setSelectedPhotos={setSelectedPhotos} />
      <ContentText>내용 입력</ContentText>
      <ContentInput setContent={setContent} />
      <ButtonsWrapper>
        <CancelButton onClick={handleCancel}>취소하기</CancelButton>
        <SubmitButton onClick={handleSubmit}>작성하기</SubmitButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default ReviewWrite;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewText = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold};
  color: ${({ theme }) => theme.colors.black};
  font-family: Noto Sans KR;
  width: 9.4rem;
  height: 3.5rem;
`;

const CustomStyledReviewCafeList = styled(ReviewCafeList)`
  margin-left: 10rem;
  .CafeImage {
    margin-right: 23rem;
  }
`;

const Separator = styled.div`
  width: 112rem;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray300};
  margin-left: 6rem;
`;
const ContentWrapper = styled.div`
  display: flex;
  width: 150rem;
`;
const StarText = styled.div`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.gray900};
  width: 30rem;
  margin-left: 9rem;
  margin-top: 3rem;
`;
const StarRatingWrapper = styled.div`
  width: 30rem;
  margin-right: 10rem;
  margin-left: -16rem;
`;
const RecommendContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 9rem;
  width: 120rem;
`;
const RecommendText = styled.div`
  color: #000000
  font-family: Noto Sans KR;
  font-size: 2rem;
  font-weight: 400;
margin-right: 22rem;
margin-top: 5rem;
`;

const RecommendButtonsWrapper = styled.div`
  display: flex;
  gap: 3rem;
  margin-left: 10rem;
  margin-top: 5rem;
`;

const RecommendButton = styled.button`
  color: ${({ theme, selected }) =>
    selected ? "white" : theme.colors.mainDark};
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.mainDark : "white"};
  width: 15rem;
  height: 4rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.mainDark};
`;

const PhotoText = styled.div`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-left: 8.8rem;
  margin-top: 5rem;
`;

const ContentText = styled.div`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 5rem 9rem;
`;

const ButtonsWrapper = styled.div`
  margin-left: 83rem;
  width: 100rem;
`;
const CancelButton = styled.button`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mainDark};
  width: 15rem;
  height: 4rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.mainDark};
  margin-right: 2rem;
`;
const SubmitButton = styled.button`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mainDark};
  width: 15rem;
  height: 4rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.mainDark};
`;
