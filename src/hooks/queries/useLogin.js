import { postLogin, postOAuthLogin } from "apis/user";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setToken } from "utils/setToken";

const handleErrorMessage = ({ code, message }) => {
  if (code === "ALREADY_EXIST_PHONE_NUMBER" || code === "MISMATCH_EMAIL") {
    alert(message);
  }
};

export const useOAuthLoginMutation = (code, platform, successCallback) => {
  return useMutation(() => postOAuthLogin(code, platform), {
    onSuccess: ({ exist, jwtTokenResponse, userInfo }) => {
      successCallback({ exist, jwtTokenResponse, userInfo });
    },
    onError: (error) => handleErrorMessage(error.response.data),
  });
};

export const useLoginMutation = (body) => {
  const navigate = useNavigate();
  return useMutation(() => postLogin(body), {
    onSuccess: ({ grantType, accessToken }) => {
      try {
        setToken({ accessToken, grantType });
      } catch (e) {
        console.error(e);
      }
      navigate("/");
    },
    onError: (error) => handleErrorMessage(error.response.data),
  });
};
