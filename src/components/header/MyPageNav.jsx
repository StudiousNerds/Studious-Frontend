import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPageNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const ACCOUNT_PATH = "account";
  const RESERVATION_PATH = "reservation";
  const REVIEWS_PATH = "reviews";
  const BOOKMARKS_PATH = "bookmarks";

  const getMyPagePath = () => {
    if (pathname.includes(ACCOUNT_PATH)) return ACCOUNT_PATH;
    else if (pathname.includes(RESERVATION_PATH)) return RESERVATION_PATH;
    else if (pathname.includes(REVIEWS_PATH)) return REVIEWS_PATH;
    else return BOOKMARKS_PATH;
  };

  const handleClickTab = (path) => {
    if (path === ACCOUNT_PATH) navigate("/myPage/account");
    else if (path === RESERVATION_PATH) navigate("/myPage/reservation");
    else if (path === REVIEWS_PATH) navigate("/myPage/reviews");
    else navigate("/myPage/bookmarks");
    return;
  };
  return (
    <NavContainer>
      <NavItem
        isCurrent={getMyPagePath() === ACCOUNT_PATH}
        onClick={() => handleClickTab(getMyPagePath())}
      >
        계정관리
      </NavItem>
      <NavItem
        isCurrent={getMyPagePath() === RESERVATION_PATH}
        onClick={() => handleClickTab(getMyPagePath())}
      >
        예약관리
      </NavItem>
      <NavItem
        isCurrent={getMyPagePath() === REVIEWS_PATH}
        onClick={() => handleClickTab(getMyPagePath())}
      >
        리뷰관리
      </NavItem>
      <NavItem
        isCurrent={getMyPagePath() === BOOKMARKS_PATH}
        onClick={() => handleClickTab(getMyPagePath())}
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
