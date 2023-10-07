import { GET, PATCH, POST } from "./api";

export const getMyPageAccount = async (token) => {
  const { data } = await GET(`/studious/mypage/members`, token);
  return data;
};

export const patchNickname = async ({ newNickname, token }) => {
  const { data } = await PATCH(
    `/studious/mypage/members/nickname`,
    {
      newNickname,
    },
    token
  );
  return data;
};

export const patchPhoneNumber = async ({ newPhoneNumber, token }) => {
  const { data } = await PATCH(
    `/studious/mypage/members/phoneNumber`,
    {
      newPhoneNumber,
    },
    token
  );
  return data;
};

export const patchPassword = async ({ oldPassword, newPassword, token }) => {
  const { data } = await PATCH(
    `/studious/mypage/members/password`,
    {
      oldPassword,
      newPassword,
    },
    token
  );
  return data;
};

export const postWithdrawAccount = async ({ password, token }) => {
  const { data } = await POST(
    `/studious/mypage/members/withdraw`,
    {
      password,
    },
    token
  );
  return data;
};

export const postProfileImage = async ({ file, token }) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await POST(
    `/studious/mypage/members/photo`,
    formData,
    token
  );
  return data;
};
