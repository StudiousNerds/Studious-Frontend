import React, { useState } from "react";
import styled from "styled-components";

const ContentInput = () => {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    const inputContent = e.target.value;
    if (inputContent.length <= 200) {
      setContent(inputContent);
    }
  };

  return (
    <>
      <StyledInput
        placeholder={`지나친 비방과 욕설은 자제해주세요.\n최대 200자까지 작성 가능합니다.`}
        value={content}
        onChange={handleChange}
        maxLength={200}
      />
    </>
  );
};

const StyledInput = styled.textarea`
  ${({ theme }) => theme.fonts.body2};
  margin-left: 9rem;
  margin-bottom: 5rem;
  width: 105.8rem;
  height: 17rem;
  border-radius: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.mainDark};
  border-radius: 0.5rem;
  padding: 1.5rem;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

export default ContentInput;
