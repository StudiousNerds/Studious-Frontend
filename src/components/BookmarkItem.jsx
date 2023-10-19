import React, { useState } from "react";
import styled from "styled-components";
import Icon from "./common/Icon";
import star from "assets/icons/starYellow.svg";
import bookmarkOn from "assets/icons/bookmarkOn.svg";
import bookmarkOff from "assets/icons/bookmarkOff.svg";
import { formatNumberWithCommas } from "utils/formatNumber";
import { useNavigate } from "react-router-dom";
import { POST } from "apis/api";
import { DELETE } from "apis/api";
import { getCookie } from "utils/cookie";

const IMG_DUMMY_URL = "http://placehold.it/640x480";

const BookmarkItem = ({ item }) => {
  const {
    studycafeId,
    cafeName,
    photo,
    grade,
    accumRevCnt,
    nearestStation,
    distance,
    hashtags,
  } = item;

  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const accessToken = getCookie("accessToken");

  const handleClickItem = () => {
    navigate(`/studyCafe/${studycafeId}`);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
    const itemId = studycafeId;
    const bookmarkStatus = !isBookmarked;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    };
    if (isBookmarked) {
      DELETE(`/mypage/bookmarks/${itemId}`, {}, config)
        .then((response) => {
          console.log(response);
          setIsBookmarked(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      POST(`/mypage/bookmarks/${itemId}`, {}, config)
        .then((response) => {
          console.log(response);
          setIsBookmarked(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <ItemLayout>
      <ItemImageBox>
        <img
          onClick={handleClickItem}
          src={photo ? photo : IMG_DUMMY_URL}
          alt="스터디카페 이미지"
        />
        <BookmarkButton onClick={handleBookmarkClick}>
          {isBookmarked ? (
            <Icon iconSrc={bookmarkOff} size={3} alt="북마크 채워진 아이콘" />
          ) : (
            <Icon iconSrc={bookmarkOn} size={3} alt="북마크 비워진 아이콘" />
          )}
        </BookmarkButton>
      </ItemImageBox>
      <ItemDetails>
        <ItemDetailsTitle onClick={handleClickItem}>
          {cafeName}
          <div className="star">
            <Icon iconSrc={star} size={1.6} lineHeight={2} alt="별점 아이콘" />
            <span>{grade}</span>
            <span className="accumRevCnt">{`(${formatNumberWithCommas(
              accumRevCnt
            )})`}</span>
          </div>
        </ItemDetailsTitle>
        <ItemDetailsMeta>
          {nearestStation &&
            distance &&
            `${nearestStation.match(/[가-힣]+역/g)} 도보 ${distance}분`}
        </ItemDetailsMeta>

        <ItemDetailsHashtags>
          {hashtags &&
            hashtags.length > 0 &&
            hashtags.map((hashtag, hashtagIndex) => (
              <div key={hashtagIndex}>#{hashtag}</div>
            ))}
        </ItemDetailsHashtags>
      </ItemDetails>
    </ItemLayout>
  );
};

export default BookmarkItem;

const ItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 28rem;
`;
const ItemImageBox = styled.div`
  width: 100%;
  position: relative;
  img {
    border-radius: 2rem;
    width: 100%;
    height: 17.3rem;
  }
`;
const ItemDetails = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ItemDetailsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.body1Bold};
  .star {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .accumRevCnt {
    color: ${({ theme }) => theme.colors.gray500};
    ${({ theme }) => theme.fonts.body2};
  }
`;
const ItemDetailsMeta = styled.div`
  ${({ theme }) => theme.fonts.body2};
`;
const ItemDetailsHashtags = styled.div`
  color: ${({ theme }) => theme.colors.mainDark};
  ${({ theme }) => theme.fonts.caption1};
  display: flex;
  gap: 5px;
`;
const BookmarkButton = styled.button`
  background-color: transprent;
  cursor: pointer;
  position: absolute;
  top: -6.9rem;
  right: 2rem;
  display: flex;
  align-items: center;
`;
