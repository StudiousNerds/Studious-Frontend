import styled from "styled-components";

export const Title = ({ children }) => {
  return <TitleBox>{children}</TitleBox>;
};

const TitleBox = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold};
  margin-bottom: 3rem;
`;

export const TitleSub = ({ children }) => {
  return <TitleSubBox>{children}</TitleSubBox>;
};

const TitleSubBox = styled.div`
  ${({ theme }) => theme.fonts.heading2Bold};
  margin-bottom: 2rem;
`;
