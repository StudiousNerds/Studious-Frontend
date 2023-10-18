import { useMutation, useQuery } from "react-query";
import {
  getMyPageAccount,
  patchNickname,
  patchPhoneNumber,
  patchPassword,
  postWithdrawAccount,
  postProfileImage,
} from "apis/myPageAccount";
import { getToken } from "utils/cookie";

export const useMyPageAccount = () => {
  const token = getToken();
  return useQuery(["useMyPageAccount"], () => getMyPageAccount(token));
};

export const useNicknameMutation = () => {
  return useMutation(patchNickname);
};

export const usePhoneNumberMutation = () => {
  return useMutation(patchPhoneNumber);
};

export const usePasswordMutation = () => {
  return useMutation(patchPassword, {
    onError: (err) => {
      /* TODO 현재는 실행되지 않는 코드 -> axios 400~500 에러 처리 추가 필요 */
      const errorCode = err.response.data.code;
      if (errorCode === "MISMATCH_PASSWORD") {
        alert("비밀번호가 일치하지 않습니다.");
      }
      console.error(err);
    },
  });
};

export const useWithdrawMutation = () => {
  return useMutation(postWithdrawAccount);
};

export const useProfileImageMutation = () => {
  return useMutation(postProfileImage);
};
