import styled from "styled-components";
import { ReactComponent as BellIcon } from "assets/icons/bell.svg";
import { ReactComponent as MessageIcon } from "assets/icons/message.svg";
import { ReactComponent as DefaultProfileIcon } from "assets/icons/defaultProfile.svg";
import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";
import { useLogoutMutation } from "hooks/queries/useLogout";
import { useNavigate } from "react-router-dom";
import ListDropdown from "components/common/ListDropdown";

const NavUser = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const dropdownListItemsObjArr = [
    {
      itemName: "예약 관리",
      itemClickEventHandler: () => navigate(`/myPage/reservation`),
    },
    {
      itemName: "리뷰",
      itemClickEventHandler: () => navigate(`/myPage/reviews`),
    },
    {
      itemName: "북마크",
      itemClickEventHandler: () => {},
    },
    {
      itemName: "로그아웃",
      itemClickEventHandler: () => logoutMutation.mutate(),
      hasBorderTop: true,
    },
  ];
  return (
    <NavLayout>
      <NavButton>
        <BellIcon />
      </NavButton>
      <NavButton>
        <MessageIcon />
      </NavButton>
      <NavButton>
        <DefaultProfileIcon />
      </NavButton>
      <NavItem>
        <ListDropdown
          buttonChildren={<MenuIcon />}
          listItemsObjArr={dropdownListItemsObjArr}
        />
      </NavItem>
    </NavLayout>
  );
};

export default NavUser;
const NavLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 5;
`;
const NavButton = styled.button`
  width: 5rem;
`;
const NavItem = styled.div`
  width: 5rem;
`;
