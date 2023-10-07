import styled from "styled-components";
import Logo from "./Logo";

const HeaderLogoOnly = () => {
  return (
    <HeaderLayout>
      <Logo />
    </HeaderLayout>
  );
};

export default HeaderLogoOnly;

const HeaderLayout = styled.section`
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray200};
  margin: 0 -16rem;
`;
