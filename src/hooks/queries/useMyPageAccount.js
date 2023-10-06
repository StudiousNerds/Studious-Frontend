import { useMutation, useQuery } from "react-query";
import {
  getMyPageAccount,
  patchNickname,
  patchPhoneNumber,
  patchPassword,
  postWithdrawAccount,
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
      const errorCode = err.response.data.code;
      if (errorCode === "MISMATCH_PASSWORD") {
        alert("비밀번호가 일치하지 않습니다.");
      }
      console.error(err);
    },
    onSuccess: () => {
      alert("비밀번호가 성공적으로 변경되었습니다.");
    },
  });
};

export const useWithdrawMutation = () => {
  return useMutation(postWithdrawAccount);
};
