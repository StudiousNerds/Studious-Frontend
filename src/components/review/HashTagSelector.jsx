import React, { useState } from "react";
import styled from "styled-components";

const HashTagSelector = ({ onSelect }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [
    { label: "깨끗해요", value: "CLEAN" },
    { label: "친절해요", value: "KIND" },
    { label: "쾌적해요", value: "PLEASANT" },
    { label: "면접용", value: "INTERVIEW" },
    { label: "역세권", value: "STATION_AREA" },
    { label: "최신식", value: "LATEST" },
    { label: "접근성", value: "ACCESS" },
    { label: "설명과동일", value: "SAME_AS_DESCRIPTION" },
    { label: "조용해요", value: "QUITE" },
    { label: "갓성비", value: "COST_EFFECTIVE" },
    { label: "집중잘돼요", value: "FOCUS" },
    { label: "프라이빗", value: "PRIVATE" },
  ];

  const maxSelectableTags = 5;

  const handleTagSelect = (tag) => {
    if (tag) {
      if (selectedTags.includes(tag)) {
        setSelectedTags(
          selectedTags.filter((selectedTag) => selectedTag !== tag)
        );
      } else {
        if (selectedTags.length < maxSelectableTags) {
          setSelectedTags([...selectedTags, tag]);
        }
      }
      onSelect(selectedTags);
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
            key={tag.label}
            isSelected={selectedTags.includes(tag.value)}
            onClick={() => handleTagSelect(tag.value)}>
            {tag.label}
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
