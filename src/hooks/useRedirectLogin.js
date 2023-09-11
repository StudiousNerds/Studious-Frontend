import { getCookie } from "utils/cookie";
import { useNavigate } from "react-router-dom";

const useRedirectLogin = (isDirectAccessWithUrl = false) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    try {
      if (!getCookie("accessToken")) {
        if (
          window.confirm(
            "로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
          )
        ) {
          navigate("/login");
        } else {
          // 해당 url로 바로 접속했을 경우엔 이전 페이지가 없으므로 홈으로 리다이렉트 시킵니다.
          if (isDirectAccessWithUrl) navigate("/");
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleRedirect,
  };
};

export default useRedirectLogin;
