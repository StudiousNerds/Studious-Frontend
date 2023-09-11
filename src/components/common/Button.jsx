import styled from "styled-components";

/**
 *
 * @param {string} text 라벨
 * @param {number} width rem
 * @param {number} height rem
 * @param {string} colorTheme 'dark' 또는 'light'
 * @param {() => void} onClick 이벤트핸들러
 * @returns 버튼 컴포넌트
 */
export const Button = ({
  text,
  width,
  height,
  colorTheme = "dark",
  onClick,
  ...props
}) => {
  return (
    <ButtonContainer width={width} height={height} colorTheme={colorTheme}>
      <button style={{ ...props.style }} onClick={onClick}>
        {text ? text : ""}
      </button>
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
    border: 1px solid ${({ theme }) => theme.colors.mainDark};
    ${({ theme }) => theme.fonts.heading2};
    background-color: ${({ colorTheme, theme }) =>
      colorTheme === "dark" ? theme.colors.mainDark : ""};
    color: ${({ colorTheme, theme }) =>
      colorTheme === "light" ? theme.colors.mainDark : ""};
  }
`;
