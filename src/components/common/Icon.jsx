import styled from "styled-components";

const Icon = ({ size, iconSrc, lineHeight = "2rem", alt }) => {
  return (
    <IconContainer size={size} lineHeight={lineHeight}>
      <img src={iconSrc} alt={alt} />
    </IconContainer>
  );
};

export default Icon;

const IconContainer = styled.div`
  width: ${({ size }) => (typeof size === "number" ? `${size}rem` : size)};
  height: ${({ size }) => (typeof size === "number" ? `${size}rem` : size)};
  line-height: ${({ size }) =>
    typeof size === "number" ? `${size}rem` : size};
`;
