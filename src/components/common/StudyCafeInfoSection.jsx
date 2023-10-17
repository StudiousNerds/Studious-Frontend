import styled from "styled-components";

const StudyCafeInfoSection = () => {
  return (
    <MainSection>
      <MainSectionBox></MainSectionBox>
    </MainSection>
  );
};

export default StudyCafeInfoSection;

const MainSection = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 22rem;
`;

const MainSectionBox = styled.div`
  flex-grow: 1;
`;
