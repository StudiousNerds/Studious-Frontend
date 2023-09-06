import styled from "styled-components";

const NavBar = ({ navBarItems, onClickMenu, activeIndex }) => {
  return (
    <NavBarContainer>
      {navBarItems.map((item, contentIndex) => (
        <NavBarItem
          isCurrent={contentIndex === activeIndex}
          onClick={() => onClickMenu(contentIndex)}
          countItems={navBarItems.length}
          key={contentIndex}
        >
          {item}
        </NavBarItem>
      ))}
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.nav`
  margin: 5rem 0;
  display: flex;
  width: 100%;
  height: 5rem;
`;

const NavBarItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.fonts.heading2Bold}
  color: ${({ isCurrent, theme }) =>
    isCurrent ? theme.colors.mainDark : theme.colors.gray800};
  border-bottom: ${({ isCurrent, theme }) =>
    isCurrent ? `2px solid ${theme.colors.mainDark}` : `1px solid`};
  width: calc(100% / ${({ countItems }) => countItems});
`;
