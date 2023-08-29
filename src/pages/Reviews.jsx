import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ReviewCafeList from "components/ReviewCafeList";
import DateFilter from "components/DateFilter";

const Reviews = () => {
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
  // useEffect(() => {
  //   // 작성 가능한 리뷰 목록 가져오기
  //   axios
  //     .get("http://localhost:8080/studious/mypage/{userd}/reviews")
  //     .then((response) => {
  //       setWritableReviews(response.data);
  //     });

  //   // 작성한 리뷰 목록 가져오기
  //   axios
  //     .get("http://localhost:8080/studious/mypage/{userd}/reviews")
  //     .then((response) => {
  //       setWrittenReviews(response.data);
  //     });
  // }, []);

  const DUMMY_DATA1 = [
    {
      reservationId: 1,
      cafeId: 1,
      cafeName: "혜화 열정공장",
      cafePhoto: null,
      roomName: "스터디룸 이름",
      payType: "카카오페이",
      price: "5,000",
      date: "2023년 05월 11일",
      startTime: "19:00",
      endTime: "21:00",
      duration: "2시간",
      validDate: "2023.6.30",
    },
    {
      reservationId: 2,
      cafeId: 2,
      cafeName: "스캇",
      cafePhoto: null,
      roomName: "스터디룸 이름",
      payType: "카카오페이",
      price: "5,000",
      date: "2023년 05월 11일",
      startTime: "19:00",
      endTime: "21:00",
      duration: "2시간",
      validDate: "2023.6.30",
    },
  ];

  const DUMMY_DATA2 = [
    {
      reservationId: 1,
      cafeId: 1,
      cafeName: "혜화 열정공장",
      cafePhoto: null,
      roomName: "스터디룸 이름",
      payType: "카카오페이",
      price: "5,000",
      date: "2023.05.10 (금)",
      startTime: "19:00",
      endTime: "21:00",
      duration: "2시간",
      writedate: "2023.5.12",
      cleanliness: 5,
      deafening: 0,
      fixtureStatus: 0,
      reviewPhoto: null,
      detail:
        "스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 ",
    },
    {
      reservationId: 2,
      cafeId: 2,
      cafeName: "스캇",
      cafePhoto: null,
      roomName: "스터디룸 이름",
      payType: "카카오페이",
      price: "5,000",
      date: "2023.05.10 (금)",
      startTime: "19:00",
      endTime: "21:00",
      duration: "2시간",
      writedate: "2023.5.12",
      cleanliness: 5,
      deafening: 2,
      fixtureStatus: 0,
      reviewPhoto: null,
      detail:
        "스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 ",
    },
  ];

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
      setWritableReviews([...DUMMY_DATA1]);
      setWrittenReviews([]);
    } else if (tab === "written") {
      setWritableReviews([]);
      setWrittenReviews([...DUMMY_DATA2]);
    }
  };

  const handleWriteReview = (review) => {
    console.log("리뷰 작성 페이지로 이동:", review);
  };

  const handleUpdateReview = (review) => {
    console.log("리뷰 수정 페이지로 이동:", review);
  };

  const handleDeleteReview = (review) => {
    console.log("리뷰 삭제", review);
  };

  const handleDateFilterChange = (dateFilter) => {
    setSelectedDateFilter(dateFilter);
  };

  useEffect(() => {
    setWritableReviews([...DUMMY_DATA1]);
  }, []);

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
          <DateFilter onDateFilter={handleWriteReview} />
          {writtenReviews.map((review) => (
            <div key={review.id}>
              <ReviewContainer key={review.id}>
                <CafeInfo>
                  <CafeImage
                    src={review.cafePhoto ?? IMG_DUMMY_URL}
                    alt="스터디카페 이미지"
                  />
                  <CafeDetails>
                    <ReviewInfoCafe>{review.cafeName}</ReviewInfoCafe>
                    <ReviewInfo>이용일자: {review.date}</ReviewInfo>
                    <ReviewInfo>{review.roomName}</ReviewInfo>
                  </CafeDetails>
                </CafeInfo>
                <SmallDivider></SmallDivider>
                <ReviewInlineInfo>
                  <ReviewStar>
                    <span>청결도</span>{" "}
                    <StarRating value={review.cleanliness} />
                    <span>방음</span> <StarRating value={review.deafening} />
                    <span>비품상태</span>{" "}
                    <StarRating value={review.fixtureStatus} />
                  </ReviewStar>
                  <ReviewInfoDate>작성 일자: {review.writedate}</ReviewInfoDate>
                </ReviewInlineInfo>
                <ReviewImageDetail>
                  <ReviewImage
                    src={review.reviewPhoto ?? IMG_DUMMY_URL}
                    alt="리뷰 이미지"
                  />
                  <ReviewInfoText>{review.detail}</ReviewInfoText>
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
