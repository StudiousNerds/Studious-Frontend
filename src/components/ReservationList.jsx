import React from "react";
import styled from "styled-components";

const IMG_DUMMY_URL =
  "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg";

const ReservationList = ({ reservations, onItemClick }) => {
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
      default:
        return null;
    }
  };

  return (
    <ListContainer>
      <ClickableItem onClick={() => onItemClick(reservations)}>
        {reservations.map((data, index) => (
          <div key={index}>
            {data.reservationRecordInfoList.map((reservation, index) => (
              <ReservationItem key={index}>
                <CafeInfo>
                  <CafeImage
                    src={reservation.studycafePhoto ?? IMG_DUMMY_URL}
                    alt="스터디카페 이미지"
                  />
                  <CafeDetails>
                    <NameStatusWrapper>
                      <ReservationInfoCafe>
                        {reservation.studycafeName}
                      </ReservationInfoCafe>
                      <Status>{reservation.reservationStatus}</Status>
                    </NameStatusWrapper>
                    <ReservationInfo>{reservation.roomName}</ReservationInfo>
                    <ReservationInfo>
                      결제금액 ₩{reservation.price}원(
                      {reservation.paymentMethod})
                    </ReservationInfo>
                    <ReservationInfo>
                      {reservation.reservationDate}{" "}
                      {reservation.reservationStartTime} -{" "}
                      {reservation.reservationEndTime} ({reservation.usingTime})
                    </ReservationInfo>
                    {renderButtons(reservation.reservationStatus)}
                  </CafeDetails>
                </CafeInfo>
              </ReservationItem>
            ))}
          </div>
        ))}
      </ClickableItem>
    </ListContainer>
  );
};

// const ReservationItem = ({ reservation }) => {
//   return (
//     <ReservationItemContainer>
//       <div>{reservation.page}</div>
//       <div>{reservation.totalPageCount}</div>
//     </ReservationItemContainer>
//   );
// };

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
  margin-bottom: 1rem;
`;

const ReservationInfo = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 0.4rem;
`;

const Status = styled.span`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.black};
  margin-left: 40rem;
  width: 10rem;
  padding: 1rem;
`;

const NameStatusWrapper = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
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

export default ReservationList;
