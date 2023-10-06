const { Outlet, Navigate } = require("react-router-dom");
const { getToken } = require("utils/cookie");

const PrivateRoute = () => {
  const token = getToken();
  if (!token) window.alert("로그인이 필요합니다.");
  else {
    return <Outlet />;
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRoute;
