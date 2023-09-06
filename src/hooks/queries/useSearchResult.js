import { useQuery } from "react-query";
import { GET } from "apis/api";
function useSearchResult({ currentPage, sortOption, searchBarData }) {
  const axiosSearchResult = async (params) => {
    const response = await GET("/studious/search", null, params);
    return response.data;
  };

  const { data: searchData } = useQuery(
    ["searchResults", currentPage, sortOption, searchBarData],
    () =>
      axiosSearchResult({
        page: currentPage,
        keyword: searchBarData.keyword,
        date: searchBarData.date,
        startTime: searchBarData.startTime,
        endTime: searchBarData.endTime,
        headCount: searchBarData.headCount,
        sortType: sortOption,
      })
  );
  return searchData;
}

export default useSearchResult;
