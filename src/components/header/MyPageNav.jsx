import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPageNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentPath = pathname.slice(pathname.indexOf("/", 1) + 1);
  const ACCOUNT_PATH = "account";
  const RESERVATION_PATH = "reservation";
  const REVIEWS_PATH = "reviews";
  const BOOKMARKS_PATH = "bookmarks";

  const handleClickTab = (currentPath) => {
    navigate(`/myPage/${currentPath}`);
  };
  return (
    <NavContainer>
      <NavItem
        isCurrent={currentPath === ACCOUNT_PATH}
        onClick={() => handleClickTab(ACCOUNT_PATH)}
      >
        계정관리
      </NavItem>
      <NavItem
        isCurrent={currentPath === RESERVATION_PATH}
        onClick={() => handleClickTab(RESERVATION_PATH)}
      >
        예약관리
      </NavItem>
      <NavItem
        isCurrent={currentPath === REVIEWS_PATH}
        onClick={() => handleClickTab(REVIEWS_PATH)}
      >
        리뷰관리
      </NavItem>
      <NavItem
        isCurrent={currentPath === BOOKMARKS_PATH}
        onClick={() => handleClickTab(BOOKMARKS_PATH)}
      >
        북마크
      </NavItem>
    </NavContainer>
  );
};

export default MyPageNav;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
`;
const NavItem = styled.button`
  ${({ theme }) => theme.fonts.heading2};
  ${({ theme, isCurrent }) =>
    isCurrent ? `color: ${theme.colors.mainDark}` : ""};
`;
