import { postLogin, postOAuthLogin } from "apis/user";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginFailCallback } from "utils/loginFail";
import { setToken } from "utils/setToken";

export const useOAuthLoginMutation = (code, platform, successCallback) => {
  return useMutation(() => postOAuthLogin(code, platform), {
    onSuccess: ({ exist, jwtTokenResponse, userInfo }) => {
      successCallback({ exist, jwtTokenResponse, userInfo });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useLoginMutation = (body) => {
  const navigate = useNavigate();
  return useMutation(() => postLogin(body), {
    onSuccess: ({ grantType, accessToken }) => {
      setToken({ accessToken, grantType });
      navigate("/");
    },
    onError: (error) => loginFailCallback(error.response.data),
  });
};
