import styled from "styled-components";

const Divider = ({
  type = "horizontal",
  margin = 1,
  length = "100%",
  color = "gray500",
  ...props
}) => {
  return (
    <Line
      type={type}
      length={length}
      color={color}
      margin={margin}
      {...props}
      style={{ ...props.style }}
    />
  );
};

export default Divider;

const Line = styled.hr`
  border: none;
  background-color: ${({ theme, color }) => theme.colors[color]};
  ${({ type, length, margin }) =>
    type === "vertical"
      ? `
    position: relative;
    top: -1px;
    display: inline-block;
    width: 1px;
    height: ${typeof length === "number" ? `${length}rem` : length};
    vertical-align: middle;
    margin: 0 ${margin}rem;
  `
      : `
    display: block;
    width: ${typeof length === "number" ? `${length}rem` : length};
    height: 1px;
    margin: ${margin}rem 0;
  `}
`;
