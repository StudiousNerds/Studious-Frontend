import styled from "styled-components";
import { ReactComponent as FilterIcon } from "assets/icons/filter.svg";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterModal from "components/FilterModal";
import StudyCafeGridItem from "components/StudyCafeGridItem";
import Pagination from "components/Pagination";
import { GET } from "apis/api";
import useSearchResult from "hooks/queries/useSearchResult";

const SearchResult = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("GRADE_DESC");
  const [currentPage, setCurrentPage] = useState(1);
  const initialSearchResult = location.state?.searchResult || [];

  // const searchResult = useSearchResult({
  //   currentPage,
  //   sortOption,
  //   searchBarData: location.state?.searchParameters || [],
  // });

  const [searchResult, setSearchResult] = useState(initialSearchResult);
  const searchBarData = location.state?.searchParameters || [];
  const [minGrade, setMinGrade] = useState("");
  const [eventInProgress, setEventInProgress] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [conveniences, setConveniences] = useState([]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, searchResult.length);
  const displayedItems = searchResult.slice(startIndex, endIndex);

  const handleFilterButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSortOptionChange = async (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);

    try {
      let apiUrl = `http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/search?page=1&sortType=${newSortOption}`;
      if (searchBarData.date) apiUrl += `&date=${searchBarData.date}`;
      if (searchBarData.startTime)
        apiUrl += `&startTime=${searchBarData.startTime}`;
      if (searchBarData.endTime) apiUrl += `&endTime=${searchBarData.endTime}`;
      if (searchBarData.headCount)
        apiUrl += `&headCount=${searchBarData.headCount}`;
      if (minGrade) apiUrl += `&minGrade=${minGrade}`;
      if (eventInProgress) apiUrl += `&eventInProgress=${eventInProgress}`;
      if (hashtags.length > 0) apiUrl += `&hashtags=${hashtags.join(",")}`;
      if (conveniences.length > 0)
        apiUrl += `&conveniences=${conveniences.join(",")}`;

      const response = await GET(apiUrl);
      if (response.status === 200) {
        const responseData = response.data;
        setSearchResult(responseData);
      }
    } catch (error) {
      console.error("Error data:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleApplyFilters = async (filterData) => {
    const { minGrade, eventInProgress, hashtags, conveniences } = filterData;
    let url = `http://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080/studious/search`;

    const queryParams = [];

    if (searchBarData.keyword) {
      queryParams.push(`keyword=${searchBarData.keyword}`);
    }
    if (searchBarData.date) {
      queryParams.push(`date=${searchBarData.date}`);
    }
    if (searchBarData.startTime) {
      queryParams.push(`startTime=${searchBarData.startTime}`);
    }
    if (searchBarData.endTime) {
      queryParams.push(`endTime=${searchBarData.endTime}`);
    }
    if (searchBarData.headCount) {
      queryParams.push(`headCount=${searchBarData.headCount}`);
    }
    queryParams.push(`sortType=${sortOption}`);
    queryParams.push(`minGrade=${minGrade}`);
    queryParams.push(`eventInProgress=${eventInProgress}`);

    if (hashtags.length > 0) {
      queryParams.push(`hashtags=${hashtags.join(",")}`);
    }
    if (conveniences.length > 0) {
      queryParams.push(`conveniences=${conveniences.join(",")}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    try {
      const response = await GET(url);

      if (response.status === 200) {
        const responseData = response.data;
        setSearchResult(responseData);
      }
    } catch (error) {
      console.error("Error data:", error);
    }
  };

  return (
    <SearchResultContainer>
      <FilterSortContainer>
        <SortSelect value={sortOption} onChange={handleSortOptionChange}>
          <option value="REVIEW_DESC">리뷰 많은 순</option>
          <option value="RESERVATION_DESC">예약 많은 순</option>
          <option value="GRADE_DESC">평점 높은 순</option>
          <option value="CREATED_DESC">최신순</option>
        </SortSelect>

        <FilterButton onClick={handleFilterButtonClick}>
          <FilterIcon />
        </FilterButton>
      </FilterSortContainer>

      {isModalOpen && (
        <FilterModal
          onClose={handleFilterButtonClick}
          applyFilters={handleApplyFilters}
        />
      )}

      <GridContainer>
        {displayedItems.map((item) => (
          <StudyCafeGridItem key={item.Id} item={item} />
        ))}
      </GridContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </SearchResultContainer>
  );
};

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterSortContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10rem 0 2.6rem 97rem;
`;

const SortSelect = styled.select`
  ${({ theme }) => theme.fonts.caption1};
  color: ${({ theme }) => theme.colors.gray800};
  border: none;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(28rem, 1fr));
  gap: 5rem;
  max-width: 122rem;
  width: 100%;
  margin: 0;
  justify-items: center;
`;

const FilterButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

export default SearchResult;
