import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const IMG_DUMMY_URL =
  "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg";

const ReservationList = ({ reservations, onItemClick }) => {
  const navigate = useNavigate();

  const renderButtons = (reservationStatus) => {
    switch (reservationStatus) {
      case "BEFORE_USING":
        return (
          <ButtonContainer>
            <EditButton>예약 변경</EditButton>
            <CancelButton>예약 취소</CancelButton>
          </ButtonContainer>
        );
      case "USING":
        return <TimeButton>시간 연장</TimeButton>;
      case "AFTER_USING":
        return <WriteReviewButton>후기 작성하기</WriteReviewButton>;
      case "CANCELED":
        return (
          <>
            <CancelReason>{reservations.cancelReason}</CancelReason>
          </>
        );
      default:
        return null;
    }
  };

  const renderStatusText = (reservationStatus) => {
    switch (reservationStatus) {
      case "BEFORE_USING":
        return "이용 전";
      case "USING":
        return "이용 중";
      case "AFTER_USING":
        return "이용 후";
      case "CANCELED":
        return "취소";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  return (
    <ListContainer>
      <ClickableItem onClick={() => onItemClick(reservations)}>
        <ReservationItem>
          <CafeInfo>
            <CafeImage
              src={reservations.studycafePhoto ?? IMG_DUMMY_URL}
              alt="스터디카페 이미지"
            />
            <CafeDetails>
              <NameStatusWrapper>
                <ReservationInfoCafe>
                  {reservations.studycafeName}
                </ReservationInfoCafe>
                <Status>
                  {renderStatusText(reservations.reservationStatus)}
                </Status>
              </NameStatusWrapper>
              <ReservationInfo>{reservations.roomName}</ReservationInfo>
              <ReservationInfo>
                결제금액 ₩{reservations.price}원
              </ReservationInfo>
              <ReservationInfo>
                {formatDate(reservations.reservationDate)}{" "}
                {reservations.reservationStartTime} -{" "}
                {reservations.reservationEndTime} ({reservations.usingTime}시간)
              </ReservationInfo>
              {renderButtons(reservations.reservationStatus)}
            </CafeDetails>
          </CafeInfo>
        </ReservationItem>
      </ClickableItem>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReservationItem = styled.div`
  margin-top: 3rem;
  margin-left: 5rem;
  padding: 3rem;
`;

const CafeInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CafeImage = styled.img`
  width: 26rem;
  height: 15rem;
  border-radius: 2rem;
  margin-right: 2rem;
`;

const CafeDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReservationInfoCafe = styled.div`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-top: 2rem;
`;

const ReservationInfo = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray800};
  margin-top: 0.8rem;
`;

const Status = styled.span`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.black};
  margin-left: 50rem;
  width: 10rem;
  padding: 1rem;
`;

const NameStatusWrapper = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  margin-left: 7rem;
  display: flex;
`;

const EditButton = styled.button`
  font-family: Noto Sans KR;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mainDark};
  border: 1px solid #0027b0;
  cursor: pointer;
  width: 15rem;
  height: 4rem;
  border-radius: 12px;
  margin-left: 30rem;
`;

const CancelButton = styled.button`
  font-family: Noto Sans KR;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mainDark};
  border: 1px solid #0027b0;
  cursor: pointer;
  width: 15rem;
  height: 4rem;
  border-radius: 12px;
  margin-left: 1.5rem;
`;

const TimeButton = styled.button`
  font-family: Noto Sans KR;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mainDark};
  border: 1px solid #0027b0;
  cursor: pointer;
  width: 15rem;
  height: 4rem;
  border-radius: 12px;
  margin-left: 46rem;
`;

const WriteReviewButton = styled.button`
  font-family: Noto Sans KR;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.mainDark};
  border: 1px solid #0027b0;
  cursor: pointer;
  width: 15rem;
  height: 4rem;
  border-radius: 12px;
  margin-left: 46rem;
`;

const ClickableItem = styled.div``;

const CancelReason = styled.div`
  margin-top: -8rem;
  margin-left: 50rem;
  border-radius: 2rem;
  width: 18rem;
  height: 9rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  text-align: center;
  padding: 3rem;
`;

export default ReservationList;
