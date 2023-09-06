import { GET } from "./api";

export const getReservation = async ({ cafeId, roomId, token }) => {
  const { data } = await GET(
    `/studious/reservations/studycafes/${cafeId}/rooms/${roomId}`,
    token
  );
  return data;
};
