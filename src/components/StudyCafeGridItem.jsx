import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Icon from "./common/Icon";
import star from "assets/icons/starYellow.svg";
import { formatNumberWithCommas } from "utils/formatNumber";

// 서버에서 가져온 데이터에 이미지가 없는 경우 사용할 대체 이미지입니다.
const IMG_DUMMY_URL = "http://placehold.it/640x480";

const StudyCafeGridItem = ({
  item: {
    id,
    name,
    photo,
    grade,
    accumRevCnt,
    nearestStation,
    walkingTime,
    hashtags,
  },
}) => {
  const navigate = useNavigate();
  const handleClickItem = () => {
    navigate(`/studyCafe/${id}`);
  };
  return (
    <ItemLayout>
      <ItemImageBox onClick={handleClickItem}>
        <img src={photo ? photo : IMG_DUMMY_URL} alt="스터디카페 이미지" />
      </ItemImageBox>
      <ItemDetails>
        <ItemDetailsTitle onClick={handleClickItem}>
          {name}
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
            walkingTime &&
            `${nearestStation.match(/[가-힣]+역/g)} 도보 ${walkingTime}분`}
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

export default StudyCafeGridItem;

const ItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 28rem;
`;
const ItemImageBox = styled.div`
  width: 100%;
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
