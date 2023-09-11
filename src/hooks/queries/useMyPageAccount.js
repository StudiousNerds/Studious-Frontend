import { useMutation, useQuery } from "react-query";
import {
  getMyPageAccount,
  patchNickname,
  patchPhoneNumber,
} from "apis/myPageAccount";
import useRedirectLogin from "hooks/useRedirectLogin";

export const useMyPageAccount = () => {
  const { token, handleRedirect } = useRedirectLogin();
  handleRedirect();
  return useQuery(["useMyPageAccount"], () => getMyPageAccount(token));
};

export const useNicknameMutation = () => {
  return useMutation(patchNickname);
};

export const usePhoneNumberMutation = () => {
  return useMutation(patchPhoneNumber);
};
