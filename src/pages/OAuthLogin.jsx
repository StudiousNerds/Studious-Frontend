import { useEffect } from "react";
import { useOAuthLoginMutation } from "hooks/queries/useLogin";
import { useNavigate } from "react-router-dom";
import { setToken } from "utils/setToken";
import { oAuthSignUpState } from "recoil/atoms/oAuthSignUpState";
import { useSetRecoilState } from "recoil";

const OAuthLogin = ({ platform }) => {
  const navigate = useNavigate();

  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");

  const setOAuthSignUp = useSetRecoilState(oAuthSignUpState);

  const oAuthLoginSuccessCallback = ({ exist, jwtTokenResponse, userInfo }) => {
    if (exist) {
      try {
        setToken({
          accessToken: jwtTokenResponse.accessToken,
          grantType: jwtTokenResponse.grantType,
        });
        navigate("/");
      } catch (e) {
        console.error(e);
      }
    } else {
      setOAuthSignUp({
        email: userInfo.email,
        providerId: userInfo.providerId,
        type: userInfo.type,
      });
      navigate("/signup");
    }
  };

  const oAuthLoginMutation = useOAuthLoginMutation(
    code,
    platform,
    oAuthLoginSuccessCallback
  );

  useEffect(() => {
    oAuthLoginMutation.mutate();
  }, []);

  return <>로그인 중입니다.</>;
};

export default OAuthLogin;
