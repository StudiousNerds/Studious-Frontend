import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { conveniencesData } from "./constants/ConvenienceData";
import { hashtagsData } from "./constants/HashtagsData";

const minGradeData = [
  { id: "0", label: "0점" },
  { id: "1", label: "1점" },
  { id: "2", label: "2점" },
  { id: "3", label: "3점" },
  { id: "4", label: "4점" },
  { id: "5", label: "5점" },
];

const FilterModal = ({ onClose, applyFilters }) => {
  const modalRef = useRef();

  const [conveniences, setConveniences] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [eventInProgress, setEventInProgress] = useState(false);
  const [minGrade, setMinGrade] = useState(0);

  const handleConveniencesChange = (convenienceId) => {
    setConveniences((prevSelected) => {
      if (prevSelected.includes(convenienceId)) {
        return prevSelected.filter((id) => id !== convenienceId);
      } else {
        return [...prevSelected, convenienceId];
      }
    });
  };

  const handleHashtagsChange = (hashtagId) => {
    setHashtags((prevSelected) => {
      if (prevSelected.includes(hashtagId)) {
        return prevSelected.filter((id) => id !== hashtagId);
      } else {
        return [...prevSelected, hashtagId];
      }
    });
  };

  const handleGradeChange = (value) => {
    if (value >= 0 && value <= 5) {
      setMinGrade(value);
    }
  };

  const handleApplyClick = () => {
    applyFilters({ minGrade, eventInProgress, hashtags, conveniences });
    onClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <FilterSection>
          <FilterText>편의시설</FilterText>
          <CheckboxGroup>
            {conveniencesData.map((convenience) => (
              <CheckboxLabel key={convenience.id}>
                <Checkbox
                  type="checkbox"
                  id={`convenience-${convenience.id}`}
                  checked={conveniences.includes(convenience.id)}
                  onChange={() => handleConveniencesChange(convenience.id)}
                />
                <CheckboxText isChecked={conveniences.includes(convenience.id)}>
                  {convenience.label}
                </CheckboxText>
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterSection>
        <FilterSection>
          <FilterText>해시태그</FilterText>
          <CheckboxGroup>
            {hashtagsData.map((hashtag) => (
              <CheckboxLabel key={hashtag.id}>
                <Checkbox
                  type="checkbox"
                  id={`hashtag-${hashtag.id}`}
                  checked={hashtags.includes(hashtag.id)}
                  onChange={() => handleHashtagsChange(hashtag.id)}
                />
                <CheckboxText isChecked={hashtags.includes(hashtag.id)}>
                  {hashtag.label}
                </CheckboxText>
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterSection>
        <FilterSection>
          <FilterText>이벤트 여부</FilterText>
          <Checkbox
            type="checkbox"
            checked={eventInProgress}
            onChange={() => setEventInProgress(!eventInProgress)}
          />
        </FilterSection>
        <FilterSection>
          <FilterText>최소 평점</FilterText>
          <GradeButtonsContainer>
            {minGradeData.map((grade) => (
              <GradeButton
                key={grade.id}
                onClick={() => handleGradeChange(Number(grade.id))}
                isActive={minGrade === Number(grade.id)}>
                {"⭐️ "}
                {grade.label}
              </GradeButton>
            ))}
          </GradeButtonsContainer>
        </FilterSection>
        <ButtonContainer>
          <ApplyButton onClick={handleApplyClick}>적용</ApplyButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(61, 61, 61, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  max-height: 80%;
  overflow-y: auto;
  width: 35rem;
  height: 40rem;
  background-color: #ffffff;
  border-radius: 2rem;
  z-index: 10000;
`;

const FilterSection = styled.div`
  align-items: center;
  margin: 0.2rem;
`;

const FilterText = styled.div`
  margin: 1rem;
  ${({ theme }) => theme.fonts.body2Bold};
  color: ${({ theme }) => theme.colors.gray800};
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CheckboxText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.1rem;
  margin-top: 0.1rem;
  color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.mainDark : theme.colors.gray500};
  border: 1px solid
    ${({ theme, isChecked }) =>
      isChecked ? theme.colors.mainDark : theme.colors.gray500};
  width: 9rem;
  height: 3rem;
  padding: 0.1rem;
  border-radius: 1rem;
  ${({ theme }) => theme.fonts.caption2};
  cursor: pointer;
`;

const Checkbox = styled.input`
  visibility: hidden;
`;

const GradeButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
`;

const GradeButton = styled.button`
  margin-left: 0.1rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.mainDark : theme.colors.gray500};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.mainDark : theme.colors.gray500};
  border-radius: 1rem;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ApplyButton = styled.button`
  margin-right: 1rem;
  padding: 0.6rem;
  ${({ theme }) => theme.fonts.caption1};
  color: ${({ theme }) => theme.colors.mainDark};
  border: 1px solid #0027b0;
  cursor: pointer;
  width: 7rem;
  height: 3rem;
  border-radius: 1rem;
`;

const CancelButton = styled.button`
  margin-right: 1rem;
  padding: 0.6rem;
  ${({ theme }) => theme.fonts.caption1};
  color: ${({ theme }) => theme.colors.mainDark};
  border: 1px solid #0027b0;
  cursor: pointer;
  width: 7rem;
  height: 3rem;
  border-radius: 1rem;
`;

export default FilterModal;
