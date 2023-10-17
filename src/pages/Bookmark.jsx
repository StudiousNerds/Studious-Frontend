import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import BookmarkItem from "components/BookmarkItem";
import Loading from "components/common/Loading";
import Pagination from "components/Pagination";

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

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        const tokenWithBearer = cookie.substring(name.length + 1);
        const token = tokenWithBearer.replace("Bearer%20", "");
        return token;
      }
    }
    return null;
  }

  const accessToken = getCookie("accessToken");

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const loadBookmarks = async () => {
    try {
      const response = await axios.get(
        `https://ec2-13-125-171-43.ap-northeast-2.compute.amazonaws.com:8080
      /studious/mypage/bookmarks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            page: currentPage,
            size: size,
          },
        }
      );
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
          <GridContainer>
            {bookmarks.map((item) => (
              <BookmarkItem key={item.Id} item={item} />
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
  align-items: center;
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
