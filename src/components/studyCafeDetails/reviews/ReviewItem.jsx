import StarsGrade from "components/common/StarsGrade";
import styled from "styled-components";

const ReviewItem = ({ totalGrade, nickname, detail, photos, date }) => {
  return (
    <ReviewItemLayout>
      <div className="profile-img" />
      <ReviewMainInfo>
        <StarsGradeRow>
          <StarsGrade size={1.8} grade={totalGrade} />
          <span>{totalGrade}</span>
        </StarsGradeRow>
        <div className="row">
          <span>{nickname}</span>
          <span>{date}</span>
        </div>
        <div className="row">
          <span>이용한 스터디룸: </span>
          <span>A룸</span>
        </div>
        <div className="row--detail">{detail}</div>
      </ReviewMainInfo>
      {photos.length > 0 && (
        <PhotosBox>
          <div className="photo-container">
            <img src={photos[0]} alt="리뷰 이미지" />
            <div className="photo-count">{photos.length}</div>
          </div>
        </PhotosBox>
      )}
    </ReviewItemLayout>
  );
};

export default ReviewItem;

const ReviewItemLayout = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr 10fr 1.5fr;
  align-items: center;
  /* padding: 4rem 3rem; */
  min-height: 10rem;
  .profile-img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const ReviewMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  .row {
    span {
      margin-right: 2rem;
      color: ${({ theme }) => theme.colors.gray500};
    }
    margin-bottom: 0.4rem;
    &--detail {
      ${({ theme }) => theme.fonts.caption1};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const StarsGradeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 5.5fr;
  ${({ theme }) => theme.fonts.body1}
  margin-bottom: 0.5rem;
`;

const PhotosBox = styled.div`
  .photo-container {
    height: 100%;
    position: relative;
    img {
      width: 10rem;
      height: 10rem;
      border-radius: 0.5rem;
      right: 0;
      bottom: 0;
    }
    .photo-count {
      position: absolute;
      right: 4rem;
      bottom: 1rem;
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      ${({ theme }) => theme.fonts.caption1};
    }
  }
`;
