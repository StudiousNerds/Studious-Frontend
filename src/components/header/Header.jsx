import { useLocation } from "react-router-dom";
import HeaderSearch from "components/header/HeaderSearch";
import HeaderLogoOnly from "components/header/HeaderLogoOnly";
import HeaderMyPage from "./HeaderMyPage";

const Header = () => {
  const { pathname } = useLocation();
  const headerLogoPages = ["/login", "/signup"];
  const getRenderComponent = () => {
    if (headerLogoPages.includes(pathname)) return <HeaderLogoOnly />;
    else if (pathname.includes("myPage")) return <HeaderMyPage />;
    return <HeaderSearch />;
  };
  return getRenderComponent();
};

export default Header;
