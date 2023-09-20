import styled from "styled-components";
import Logo from "./Logo";
import NavGuest from "./NavGuest";
import NavUser from "./NavUser";
import { useEffect, useState } from "react";
import { getCookie } from "utils/cookie";
import MyPageNav from "./MyPageNav";

const HeaderMyPage = () => {
  const [isUser, setIsUser] = useState(false);
  const cookie = getCookie("accessToken");
  useEffect(() => {
    cookie ? setIsUser(true) : setIsUser(false);
  }, [cookie]);
  return (
    <HeaderLayout>
      <Logo />
      <MyPageNav />
      {isUser ? <NavUser /> : <NavGuest />}
    </HeaderLayout>
  );
};

export default HeaderMyPage;

const HeaderLayout = styled.section`
  padding: 3rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray200};
`;
