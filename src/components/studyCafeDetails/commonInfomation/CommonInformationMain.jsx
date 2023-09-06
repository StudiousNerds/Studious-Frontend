import styled from "styled-components";
import ImagesGrid from "./ImagesGrid";
import HashTagsRow from "./HashTagsRow";
import { useRecoilValue } from "recoil";
import { detailsCommonSelector } from "recoil/selectors/studyCafeDetails";

const CommonInformationMain = () => {
  const commonDetails = useRecoilValue(detailsCommonSelector);
  const {
    cafeName,
    cafePhotos,
    accumResCnt,
    nearestStation,
    distance,
    hashtags,
  } = commonDetails;
  return (
    <>
      <InformationHeader>
        <div className="left-side-header">
          <div className="left-side-header__title">{cafeName}</div>
          <div className="left-side-header__distance">
            {`${nearestStation} 도보 ${distance}분`}
          </div>
        </div>
        <div className="right-side-header__accumResCnt">
          예약 {accumResCnt}회
        </div>
      </InformationHeader>
      <ImagesGrid photos={cafePhotos} />
      <HashTagsRow hashtags={hashtags} />
    </>
  );
};

export default CommonInformationMain;

const InformationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-side-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    &__title {
      ${({ theme }) => theme.fonts.heading1Bold};
    }

    &__distance {
      ${({ theme }) => theme.fonts.body1};
      color: ${({ theme }) => theme.colors.mainDark};
    }
  }

  .right-side-header__accumResCnt {
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.mainDark};
  }
`;
