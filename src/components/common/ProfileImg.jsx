import styled from "styled-components";
import { ReactComponent as DefaultProfileSvg } from "assets/icons/defaultProfile.svg";

const ProfileImg = ({ imageSrc, size }) => {
  return (
    <ImageContainer size={size}>
      {imageSrc ? (
        <img src={imageSrc} alt="사용자 프로필 이미지" />
      ) : (
        <DefaultProfileSvg />
      )}
    </ImageContainer>
  );
};

export default ProfileImg;

const ImageContainer = styled.div`
  width: ${({ size }) => (typeof size === "number" ? `${size}rem` : size)};
  height: ${({ size }) => (typeof size === "number" ? `${size}rem` : size)};
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
