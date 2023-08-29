import React from "react";
import styled from "styled-components";
import ReviewCafeList from "./ReviewCafeList";

const ReservationList = ({ reservations }) => {
  return (
    <ListContainer>
      {reservations.map((reservation) => (
        <ReservationItem key={reservation.page} reservation={reservation} />
      ))}
    </ListContainer>
  );
};

const ReservationItem = ({ reservation }) => {
  return (
    <ReservationItemContainer>
      <div>{reservation.page}</div>
      <div>{reservation.totalPageCount}</div>
    </ReservationItemContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReservationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ReservationList;
