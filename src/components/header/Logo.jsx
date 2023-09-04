import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Logo() {
  const navigate = useNavigate();
  return <LogoBox onClick={() => navigate("/")}>STUDIOUS</LogoBox>;
}

const LogoBox = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.fonts.logo};
  color: ${({ theme }) => theme.colors.mainDark};
  z-index: 5;
`;
