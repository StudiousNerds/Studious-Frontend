import styled from "styled-components";
import { useRecoilValue } from "recoil";
import ReviewItem from "./ReviewItem";
import { studyCafeDetails } from "recoil/atoms/studyCafeDetails";

const ReviewsList = ({ reviewData }) => {
  const { roomsData } = useRecoilValue(studyCafeDetails);
  return (
    <>
      <ListHeader>
        <select defaultValue="all">
          <option value="all">모든 스터디룸</option>
          {roomsData &&
            roomsData.length !== 0 &&
            roomsData.map(({ id, roomName }) => (
              <option key={id} value={id}>
                {roomName}
              </option>
            ))}
        </select>
        <OrderBySelector>
          {["최신순", "평점 높은 순", "평점 낮은 순"].map(
            (option, optionIndex) => (
              <button
                key={optionIndex}
                className={optionIndex === 0 ? "firstOption" : ""}
              >
                {option}
              </button>
            )
          )}
        </OrderBySelector>
      </ListHeader>
      {reviewData &&
        reviewData.length !== 0 &&
        reviewData.map(
          ({ grade, email, detail, photos, date }, reviewIndex) => (
            <ReviewItemContainer
              key={reviewIndex}
              hasBorder={reviewIndex !== reviewData.length - 1}
            >
              <ReviewItem
                key={reviewIndex}
                grade={grade}
                email={email}
                detail={detail}
                photos={photos}
                date={date}
              />
            </ReviewItemContainer>
          )
        )}
    </>
  );
};

export default ReviewsList;

const ListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainDark};
  select {
    ${({ theme }) => theme.fonts.body2};
    border: none;
    outline: none;
  }
`;

const OrderBySelector = styled.div`
  ${({ theme }) => theme.fonts.caption1};
  button:not(.firstOption) {
    border-left: 1px solid;
  }
`;

const ReviewItemContainer = styled.div`
  ${({ hasBorder, theme }) =>
    hasBorder && `border-bottom: 2px solid ${theme.colors.gray200}`}
`;
