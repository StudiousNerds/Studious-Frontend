import styled from "styled-components";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import React, { useState } from "react";
import SearchBar from "components/Search/SearchBar";

const SearchBox = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      {!isSearchBarOpen && (
        <SearchBoxLayout onClick={handleSearchClick}>
          <SearchBoxInput placeholder="스터디룸 검색" />
          <SearchBoxButton>
            <SearchIcon />
          </SearchBoxButton>
        </SearchBoxLayout>
      )}
      {isSearchBarOpen && (
        <ModalContainer>
          <SearchBar />
        </ModalContainer>
      )}
      {isSearchBarOpen && <Overlay onClick={handleSearchClick} />}
    </div>
  );
};
const SearchBoxLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  width: 50rem;
  height: 5rem;
  border-radius: 4rem;
  padding: 5px;
  cursor: pointer;
  background-color: #ffffff;
  margin-bottom: ${(props) => (props.isSearchBarOpen ? "-50rem" : "0")};
`;

const SearchBoxInput = styled.input`
  ${({ theme }) => theme.fonts.body1};
  border: none;
  width: 100%;
  &::placeholder {
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.gray300};
  }
  padding-left: 1.2rem;
`;

const SearchBoxButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.mainDark};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100%;
  height: 25rem;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding-top: 30px;
  margin-bottom: 0rem;
`;

const SearchBarModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
  z-index: 2;
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: calc(100% - 5rem);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export default SearchBox;
