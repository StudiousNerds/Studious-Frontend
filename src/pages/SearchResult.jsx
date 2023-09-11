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
  const initialSearchResultFake = [
    {
      Id: 1,
      name: "스터디카페1",
      photo: "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
      accumRevCnt: 20,
      distance: "500m",
      grade: 4.5,
      hashtags: ["조용한", "와이파이 빠름", "좌석 넓음"],
    },
    {
      Id: 2,
      name: "스터디카페2",
      photo: "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
      accumRevCnt: 12,
      distance: "700m",
      grade: 3.8,
      hashtags: ["편안한", "음료 다양", "서비스 좋음"],
    },
    {
      Id: 3,
      name: "스터디카페3",
      photo: "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
      accumRevCnt: 20,
      distance: "500m",
      grade: 4.5,
      hashtags: ["조용한", "와이파이 빠름", "좌석 넓음"],
    },
    {
      Id: 4,
      name: "스터디카페4",
      photo: "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
      accumRevCnt: 20,
      distance: "500m",
      grade: 4.5,
      hashtags: ["조용한", "와이파이 빠름", "좌석 넓음"],
    },
    {
      Id: 5,
      name: "스터디카페5",
      photo: "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
      accumRevCnt: 20,
      distance: "500m",
      grade: 4.5,
      hashtags: ["조용한", "와이파이 빠름", "좌석 넓음"],
    },
    {
      Id: 6,
      name: "스터디카페6",
      photo: "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
      accumRevCnt: 20,
      distance: "500m",
      grade: 4.5,
      hashtags: ["조용한", "와이파이 빠름", "좌석 넓음"],
    },
    {
      Id: 7,
      name: "스터디카페7",
      photo: "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
      accumRevCnt: 20,
      distance: "500m",
      grade: 4.5,
      hashtags: ["조용한", "와이파이 빠름", "좌석 넓음"],
    },
    {
      Id: 8,
      name: "스터디카페8",
      photo: "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
      accumRevCnt: 20,
      distance: "500m",
      grade: 4.5,
      hashtags: ["조용한", "와이파이 빠름", "좌석 넓음"],
    },
    {
      Id: 9,
      name: "스터디카페9",
      photo: "https://www.idjnews.kr/news/photo/202008/124221_84195_2158.jpg",
      accumRevCnt: 20,
      distance: "500m",
      grade: 4.5,
      hashtags: ["조용한", "와이파이 빠름", "좌석 넓음"],
    },
  ];
  const [searchResult, setSearchResult] = useState(initialSearchResultFake);
  const searchBarData = location.state?.searchParameters || [];

  // const { data: searchResultData } = useSearchResult({
  //   currentPage,
  //   sortOption,
  //   searchBarData,
  // });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, searchResult.length);
  const displayedItems = searchResult.slice(startIndex, endIndex);

  const handleFilterButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleApplyFilters = async (filterData) => {
    const { minGrade, eventInProgress, hashtags, conveniences } = filterData;
    const url = `/studious/search`;

    const params = {
      page: currentPage,
      keyword: searchBarData.keyword,
      date: searchBarData.date,
      startTime: searchBarData.startTime,
      endTime: searchBarData.endTime,
      headCount: searchBarData.headCount,
      sortType: sortOption,
      minGrade: minGrade,
      eventInProgress: eventInProgress,
      hashtags: hashtags.join(","),
      conveniences: conveniences.join(","),
    };

    try {
      const response = await GET(url, null, params);

      if (response.status === 200) {
        const responseData = response.data;
        setSearchResult(responseData);
      }
    } catch (error) {
      console.error("Error data:", error);
      console.log(url);
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
