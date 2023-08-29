import styled from "styled-components";

const Icon = ({ size, iconSrc, alt }) => {
  return (
    <IconContainer size={size}>
      <img src={iconSrc} alt={alt} />
    </IconContainer>
  );
};

export default Icon;

const IconContainer = styled.div`
  width: ${({ size }) => (typeof size === "number" ? `${size}rem` : size)};
  height: ${({ size }) => (typeof size === "number" ? `${size}rem` : size)};
`;
