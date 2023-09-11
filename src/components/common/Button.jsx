import styled from "styled-components";

/**
 *
 * @param {string} text 라벨
 * @param {number} width rem
 * @param {number} height rem
 * @param {string} colorTheme 'dark' 또는 'light'
 * @returns 버튼 컴포넌트
 */
export const Button = ({
  text,
  width,
  height,
  colorTheme = "dark",
  ...props
}) => {
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
    border: 1px solid ${({ theme }) => theme.colors.mainDark};
    ${({ theme }) => theme.fonts.heading2};
    ${({ colorTheme }) => {
      return colorTheme === "dark"
        ? `
        background-color: ${({ colorTheme }) => colorTheme.colors.mainDark};
        color: ${({ colorTheme }) => colorTheme.colors.mostLight};
      `
        : `
        color: ${({ colorTheme }) => colorTheme.colors.mainDark};
      `;
    }}
  }
`;
