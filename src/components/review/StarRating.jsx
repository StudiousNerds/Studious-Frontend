import React from "react";
import styled from "styled-components";

const StarRating = ({ label, ratingValue, onChange }) => {
  const [rating, setRating] = React.useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onChange(newRating);
  };

  return (
    <StarRatingWrapper>
      <StarRatingLabel>{label}</StarRatingLabel>
      <StarRatingStars>
        {[1, 2, 3, 4, 5].map((index) => (
          <StarRatingStarRadio
            key={index}
            type="radio"
            name={label}
            value={index}
            checked={rating === index}
            onChange={() => handleRatingChange(index)}
          />
        ))}
        {[1, 2, 3, 4, 5].map((index) => (
          <StarRatingStarIcon
            key={index}
            filled={index <= rating}
            onClick={() => handleRatingChange(index)}
          />
        ))}
      </StarRatingStars>
      <SelectedRating>{rating}점</SelectedRating>
    </StarRatingWrapper>
  );
};

const StarRatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 3rem;
  flex-direction: row;
  width: 40rem;
`;

const StarRatingLabel = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  flex-direction: row;
  width: 6rem;
`;

const StarRatingStars = styled.div`
  display: inline-flex;
  margin-left: 5rem;
`;

const StarRatingStarRadio = styled.input`
  display: none;
`;

const StarRatingStarIcon = styled.span`
  font-size: 3rem;
  margin-left: 1rem;
  color: ${({ theme, filled }) => (filled ? "#F9CA24" : theme.colors.gray300)};
  cursor: pointer;
  user-select: none;
  &:before {
    content: "★";
  }
`;

const SelectedRating = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: #000000;
  margin-left: 3.7rem;
  display: flex;
  flex-direction: row;
`;

export default StarRating;
