import { useQuery } from "react-query";
import { getMyPageAccount } from "apis/myPageAccount";
import useRedirectLogin from "hooks/useRedirectLogin";

export const useMyPageAccount = () => {
  const { token, handleRedirect } = useRedirectLogin();
  handleRedirect();
  return useQuery(["useMyPageAccount"], () => getMyPageAccount(token));
};
