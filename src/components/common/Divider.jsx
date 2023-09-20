import styled from "styled-components";

const Divider = ({
  type = "horizontal",
  margin = 1,
  length = "100%",
  ...props
}) => {
  const dividerStyle = {
    margin: type === "vertical" ? `0 ${margin}rem` : `${margin}rem 0`,
  };
  return (
    <Line
      type={type}
      length={length}
      {...props}
      style={{ ...dividerStyle, ...props.style }}
    />
  );
};

export default Divider;

const Line = styled.hr`
  border: none;
  background-color: ${({ theme }) => theme.colors.gray500};
  ${({ type, length }) =>
    type === "vertical"
      ? `
    position: relative;
    top: -1px;
    display: inline-block;
    width: 1px;
    height: ${typeof length === "number" ? `${length}rem` : length};
    vertical-align: middle;
  `
      : `
    display: block;
    width: ${typeof length === "number" ? `${length}rem` : length};
    height: 1px;
  `}
`;
