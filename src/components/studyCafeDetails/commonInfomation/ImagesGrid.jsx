import styled from "styled-components";
import ImagesGridItem from "./ImagesGridItem";

const ImagesGrid = ({ photos }) => {
  return (
    <GridContainer>
      {photos.map((imgUrl, imgIndex) => {
        return (
          <GridItem
            key={imgIndex}
            isExpand={imgIndex === 0 || (photos.length === 2 && 1)}
          >
            <ImagesGridItem imageSrc={imgUrl} />
          </GridItem>
        );
      })}
    </GridContainer>
  );
};

export default ImagesGrid;

const GRID_GAP = "2rem";

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 20rem);
  grid-template-columns: repeat(4, calc((100% - 3 * ${GRID_GAP}) / 4));
  gap: ${GRID_GAP};
`;

const GridItem = styled.div`
  ${({ isExpand }) =>
    isExpand &&
    `
      grid-row: span 2;
      grid-column: span 2;
    `}
`;
