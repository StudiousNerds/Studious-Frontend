import React from "react";
import styled from "styled-components";

const DeletePopup = ({ review, onClose, onDelete }) => {
  return (
    <PopupWrapper>
      <PopupContent>
        <PopupText>리뷰를 삭제하시겠습니까?</PopupText>
        <ButtonWrapper>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <DeleteButton onClick={() => onDelete(review)}>삭제</DeleteButton>
        </ButtonWrapper>
      </PopupContent>
    </PopupWrapper>
  );
};

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
`;

const PopupText = styled.div`
  ${({ theme }) => theme.fonts.body1};
  margin-bottom: 3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CancelButton = styled.button`
  ${({ theme }) => theme.fonts.body2};
  color: white;
  background-color: ${({ theme }) => theme.colors.gray300};
  margin-right: 1rem;
  width: 5rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  ${({ theme }) => theme.fonts.body2};
  color: white;
  background-color: ${({ theme }) => theme.colors.mainDark};
  margin-right: 1rem;
  width: 5rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
`;

export default DeletePopup;
