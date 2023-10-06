import React, { useState } from "react";
import styled from "styled-components";
import { GET } from "apis/api";

const ReservationSearchCafe = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const queryParams = new URLSearchParams({ cafeName: searchQuery });
    const queryString = queryParams.toString();
    const url = `/api/searchCafes?${queryString}`;
  };

  return (
    <PageContainer>
      <SearchBar>
        <input
          type="text"
          placeholder="스터디카페 명으로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>조회하기</SearchButton>
      </SearchBar>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBar = styled.div`
  input {
    flex: 1;
    border: none;
    padding: 0.5rem;
    border-radius: 1rem;
    border: 1px solid var(--sub-color-light-2, #c6c6c6);
    background-color: transparent;
    color: ${({ theme }) => theme.colors.gray800};
    ${({ theme }) => theme.fonts.body2};
    outline: none;
    margin-left: 3rem;
    height: 4rem;

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
`;

const SearchButton = styled.button`
  width: 10rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin-left: 3rem;
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.body1};
`;

export default ReservationSearchCafe;
