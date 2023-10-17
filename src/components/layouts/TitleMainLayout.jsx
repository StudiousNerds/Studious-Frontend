import { Title } from "components/common/Title";
import styled from "styled-components";

const TitleMainLayout = ({ title, children }) => {
  return (
    <MainLayout>
      <Title>{title}</Title>
      <MainContainer>{children}</MainContainer>
    </MainLayout>
  );
};

export default TitleMainLayout;

const MainLayout = styled.div`
  margin-top: 5rem;
  margin-bottom: 20rem;
`;

const MainContainer = styled.main`
  padding-left: 3rem;
`;
