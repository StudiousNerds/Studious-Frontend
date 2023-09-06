import styled from "styled-components";

const ImagesGridItem = ({ imageSrc }) => {
  return <ItemImage src={imageSrc} alt="스터디카페 이미지" />;
};

export default ImagesGridItem;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2.5rem;
`;
