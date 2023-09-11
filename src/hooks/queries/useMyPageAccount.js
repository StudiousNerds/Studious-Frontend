import { useMutation, useQuery } from "react-query";
import { getMyPageAccount, patchNickname } from "apis/myPageAccount";
import useRedirectLogin from "hooks/useRedirectLogin";

export const useMyPageAccount = () => {
  const { token, handleRedirect } = useRedirectLogin();
  handleRedirect();
  return useQuery(["useMyPageAccount"], () => getMyPageAccount(token));
};

export const useNicknameMutation = (nickname, body) => {
  const { token } = useRedirectLogin();
  return useMutation(["useNicknameMutation"], () =>
    patchNickname(token, nickname)
  );
};
