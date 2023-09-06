import styled from "styled-components";
import { ReactComponent as BellIcon } from "assets/icons/bell.svg";
import { ReactComponent as MessageIcon } from "assets/icons/message.svg";
import { ReactComponent as DefaultProfileIcon } from "assets/icons/defaultProfile.svg";
import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";
import { useLogoutMutation } from "hooks/queries/useLogout";

const NavUser = () => {
  const handleLogoutMutation = useLogoutMutation();
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
      <NavButton>
        <MenuIcon />
        <div onClick={() => handleLogoutMutation.mutate()}>로그아웃</div>
      </NavButton>
    </NavLayout>
  );
};

export default NavUser;
const NavLayout = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 5;
`;
const NavButton = styled.button``;
