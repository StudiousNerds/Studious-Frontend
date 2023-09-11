import { GET, PATCH } from "./api";

export const getMyPageAccount = async (token) => {
  const { data } = await GET(`/studious/mypage/members`, token);
  return data;
};

export const patchNickname = async (token, newNickname) => {
  const { data } = await PATCH(
    `/studious/mypage/members/nickname`,
    {
      newNickname: newNickname,
    },
    token
  );
  return data;
};
