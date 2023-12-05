import { GET, POST } from "./api";

export const getReservation = async ({ cafeId, roomId, token }) => {
  const { data } = await GET(`/rooms/${roomId}`, token);
  return data;
};

export const postReservation = async ({ cafeId, roomId, token, body }) => {
  const { data } = await POST(`/rooms/${roomId}`, body, token);
  return data;
};
