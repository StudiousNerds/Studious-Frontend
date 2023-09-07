import styled from "styled-components";

export const DarkButton = ({ text, width, height, ...props }) => {
  return (
    <ButtonContainer width={width} height={height}>
      <button style={{ ...props.style }}>{text ? text : ""}</button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  width: ${({ width }) => (typeof width === "number" ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === "number" ? `${height}rem` : height};
  button {
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.colors.mainDark};
    color: ${({ theme }) => theme.colors.mostLight};
    ${({ theme }) => theme.fonts.heading2};
  }
`;
