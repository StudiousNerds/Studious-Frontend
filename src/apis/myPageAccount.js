import { GET } from "./api";

export const getMyPageAccount = async (token) => {
  const { data } = await GET(`/studious/mypage/members`, token);
  return data;
};
