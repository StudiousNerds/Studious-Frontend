import React, { useState } from "react";
import styled from "styled-components";

const HashTagSelector = ({ onSelect }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [
    "깨끗해요",
    "친절해요",
    "쾌적해요",
    "면접용",
    "역세권",
    "최신식",
    "접근성",
    "설명과동일",
    "조용해요",
    "갓성비",
    "집중잘돼요",
    "프라이빗",
  ];

  const maxSelectableTags = 5;

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      if (selectedTags.length < maxSelectableTags) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const selectedCount = selectedTags.length;

  return (
    <HashTagSelectorWrapper>
      <HashTagLabel>
        해시태그 선택{" "}
        <SelectedCount>
          ({selectedCount} / {maxSelectableTags})
        </SelectedCount>
      </HashTagLabel>
      <HashTagList>
        {allTags.map((tag) => (
          <HashTagButton
            key={tag}
            isSelected={selectedTags.includes(tag)}
            onClick={() => handleTagSelect(tag)}>
            {tag}
          </HashTagButton>
        ))}
      </HashTagList>
    </HashTagSelectorWrapper>
  );
};

const HashTagSelectorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 10rem;
`;

const HashTagLabel = styled.div`
  ${({ theme }) => theme.fonts.body1Bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin-right: 3rem;
  margin-top: 2rem;
`;

const HashTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 30rem;
  margin-top: 2rem;
`;

const HashTagButton = styled.button`
  ${({ theme }) => theme.fonts.caption2};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? "rgba(0, 39, 176, 0.3)" : theme.colors.gray200};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.black};
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  width: 8.5rem;
  height: 3.5rem;
  cursor: pointer;
  outline: none;
`;

const SelectedCount = styled.span`
  ${({ theme }) => theme.fonts.body1};
  color: #000000;
  display: flex;
  margin-left: 5.5rem;
`;

export default HashTagSelector;
