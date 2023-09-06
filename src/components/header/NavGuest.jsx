import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavGuest = () => {
  const navigate = useNavigate();
  return (
    <NavLayout>
      <NavButton onClick={() => navigate("/login")}>로그인</NavButton>
      <NavButton onClick={() => navigate("/signup")}>회원가입</NavButton>
      <NavButton>관리자 페이지로 이동</NavButton>
    </NavLayout>
  );
};

export default NavGuest;
const NavLayout = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 5;
`;
const NavButton = styled.button``;
