import { postLogin, postOAuthLogin } from "apis/user";
import { USER } from "components/constants/User";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "utils/cookie";
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
    onSuccess: ({ tokenInfo: { grantType, accessToken }, profile }) => {
      try {
        console.log(accessToken, grantType);
        setToken({ accessToken, grantType });
        setCookie({ key: USER.profileKey, value: JSON.stringify(profile) });
      } catch (e) {
        console.error(e);
      }
      navigate("/");
    },
    onError: (error) => handleErrorMessage(error.response.data),
  });
};
