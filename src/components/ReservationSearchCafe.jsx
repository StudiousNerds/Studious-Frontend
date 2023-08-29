import React, { useState } from "react";
import styled from "styled-components";

const ReservationSearchCafe = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // 검색 버튼을 클릭했을 때 처리할 로직
    // 예를 들어, API 호출 등의 작업을 수행할 수 있습니다.
    // 여기서는 URL에 query parameter를 추가하는 예제를 보여드립니다.
    const queryParams = new URLSearchParams({ cafeName: searchQuery });
    const queryString = queryParams.toString();
    const url = `/api/searchCafes?${queryString}`; // 여기서 실제 API 엔드포인트로 변경해야 합니다.

    // url을 사용하여 GET 요청을 보내고 결과를 처리할 수 있습니다.
    // 예: fetch(url).then(response => response.json()).then(data => console.log(data));
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
    margin-left: 1rem;
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
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.body1};
`;

export default ReservationSearchCafe;
