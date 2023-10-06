import styled from "styled-components";

const AppLayout = ({ children }) => {
  return (
    <main>
      <MainSectionLayout>{children}</MainSectionLayout>;
    </main>
  );
};

const MainSectionLayout = styled.section`
  margin: 0 auto;
  max-width: 112rem;
`;

export default AppLayout;
