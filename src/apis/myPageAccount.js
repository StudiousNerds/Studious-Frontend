import { GET, PATCH } from "./api";

export const getMyPageAccount = async (token) => {
  const { data } = await GET(`/studious/mypage/members`, token);
  return data;
};

export const patchNickname = async ({ newNickname, token }) => {
  const { data } = await PATCH(
    `/studious/mypage/members/nickname`,
    {
      newNickname: newNickname,
    },
    token
  );
  return data;
};

export const patchPhoneNumber = async ({ newPhoneNumber, token }) => {
  const { data } = await PATCH(
    `/studious/mypage/members/phoneNumber`,
    {
      newPhoneNumber: newPhoneNumber,
    },
    token
  );
  return data;
};

export const patchPassword = async ({ oldPassword, newPassword, token }) => {
  const { data } = await PATCH(
    `/studious/mypage/members/password`,
    {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
    token
  );
  return data;
};
