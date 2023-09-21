import { postSignUp } from "apis/user";
import { useMutation } from "react-query";
import { setToken } from "utils/setToken";
import { useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { oAuthSignUpState } from "recoil/atoms/oAuthSignUpState";

export const useSignUpMutation = (signUpInfo) => {
  const resetOAuthSignUp = useResetRecoilState(oAuthSignUpState);
  const navigate = useNavigate();
  return useMutation(() => postSignUp(signUpInfo), {
    onSuccess: ({ accessToken, grantType }) => {
      setToken({ accessToken, grantType });
      resetOAuthSignUp();
      navigate("/");
    },
    onError: (error) => {
      if (error.response.status === 400) alert(error.response.data.message);
      else {
        resetOAuthSignUp();
        navigate("/login");
      }
    },
  });
};
