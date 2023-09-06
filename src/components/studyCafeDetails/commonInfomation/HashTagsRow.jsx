import styled from "styled-components";

const HashTagsRow = ({ hashtags }) => {
  return (
    <HashTagsRowLayout>
      {hashtags.map((hashtag, hashtagIndex) => (
        <HashTagBox key={hashtagIndex}>{hashtag}</HashTagBox>
      ))}
    </HashTagsRowLayout>
  );
};

export default HashTagsRow;

const HashTagsRowLayout = styled.section`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const HashTagBox = styled.div`
  background-color: ${({ theme }) => theme.colors.main30};
  ${({ theme }) => theme.fonts.body2};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
`;
