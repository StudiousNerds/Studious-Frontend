import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import BookmarkItem from "components/BookmarkItem";
import Loading from "components/common/Loading";
import Pagination from "components/Pagination";
import { getCookie } from "utils/cookie";
import { GET } from "apis/api";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(bookmarks.length / itemsPerPage);

  useEffect(() => {
    loadBookmarks();
  }, [currentPage]);

  const accessToken = getCookie("accessToken");

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const loadBookmarks = async () => {
    try {
      const response = await GET(`/mypage/bookmarks`, accessToken, {
        params: {
          page: currentPage,
          size: size,
        },
      });
      setBookmarks(response.data.bookmarkInfo);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <BookmarkContainer>
          <BookmarkText>북마크</BookmarkText>
          <GridContainer>
            {bookmarks.map((item) => (
              <BookmarkItem
                key={item.studycafeId}
                item={item}
                isBookmarked={item.isBookmarked}
              />
            ))}
          </GridContainer>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </BookmarkContainer>
      )}
    </>
  );
};
export default Bookmark;

const BookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const BookmarkText = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-top: 5rem;
  margin-bottom 5rem;
`;
