import styled from "styled-components";
import { ReactComponent as NoPhotoIcon } from "assets/icons/noPhoto.svg";

/**
 * 스터디카페 썸네일 이미지
 * imageSrc를 넘기지 않으면 사진 없는 썸네일 반환
 * @param {string} width
 * @param {string} height
 * @returns 모서리 둥근 이미지 컴포넌트
 */
const ThumbnailImage = ({ imageSrc, width, height }) => {
  return (
    <>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt="스터디카페 썸네일 이미지"
          width={width}
          height={height}
        />
      ) : (
        <NoImageBox width={width} height={height}>
          <NoPhotoIcon />
        </NoImageBox>
      )}
    </>
  );
};

export default ThumbnailImage;

const Image = styled.img`
  border-radius: 2rem;
  width: ${({ width }) => width + "rem"};
  height: ${({ height }) => height + "rem"};
`;

const NoImageBox = styled.div`
  border-radius: 2rem;
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => height + "rem"};
  background-color: ${({ theme }) => theme.colors.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
`;
