import { GET, POST } from "./api";

export const getPreviousReservationInfo = async ({ reservationId, token }) => {
  const { data } = await GET(
    `/mypage/reservations/${reservationId}/changing`,
    token
  );
  return data;
};

export const postReservationModify = async ({ reservationId, body, token }) => {
  const { data } = await POST(
    `/mypage/reservations/${reservationId}/changing`,
    body,
    token
  );
  return data;
};
