import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Divider from "./Divider";

const ListDropdown = ({ buttonChildren, listItemsObjArr }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownButtonRef = useRef(null);

  useEffect(() => {
    const handleOutsideClose = (e) => {
      if (isDropdownOpen && !dropdownButtonRef.current.contains(e.target))
        setIsDropdownOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);
    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isDropdownOpen]);

  return (
    <>
      <DropdownButton
        ref={dropdownButtonRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {buttonChildren}
      </DropdownButton>
      {isDropdownOpen && (
        <DropdownContainer>
          <ul>
            {listItemsObjArr &&
              listItemsObjArr.map(
                ({ itemName, itemClickEventHandler, hasBorderTop }) => {
                  return (
                    <>
                      {hasBorderTop && <Divider />}
                      <ListItem onClick={itemClickEventHandler}>
                        {itemName}
                      </ListItem>
                    </>
                  );
                }
              )}
          </ul>
        </DropdownContainer>
      )}
    </>
  );
};

export default ListDropdown;

const DropdownButton = styled.button`
  position: relative;
`;
const DropdownContainer = styled.div`
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  width: 20rem;
  padding: 2rem;
  position: absolute;
  transform: translate(calc(-100% + 5rem), 2rem);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const ListItem = styled.li`
  padding: 1rem 1rem;
  ${({ theme }) => theme.fonts.body1};
  text-align: start;
  &:hover {
    color: ${({ theme }) => theme.colors.mainDark};
    font-weight: 700;
  }
  cursor: pointer;
`;
