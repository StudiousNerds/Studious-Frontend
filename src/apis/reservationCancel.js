import { GET, POST } from "./api";

export const getPreviousReservationInfoCancel = async ({
  reservationId,
  token,
}) => {
  const { data } = await GET(
    `/reservations/${reservationId}/cancellations`,
    token
  );
  return data;
};

export const postReservationCancel = async ({ reservationId, body, token }) => {
  const { data } = await POST(
    `/reservations/${reservationId}/cancellations`,
    body,
    token
  );
  return data;
};
