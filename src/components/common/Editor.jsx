import styled from "styled-components";

export const EditableDiv = ({
  readOnly = false,
  placeholder = "",
  onChange = () => {},
  children,
  width,
  height,
  ...props
}) => {
  return (
    <EditableBox
      contentEditable={!readOnly}
      placeholder={placeholder}
      onChange={onchange}
      width={width || "100%"}
      height={height || "100%"}
      style={{ ...props.style }}
    >
      {children}
    </EditableBox>
  );
};

const EditableBox = styled.div`
  resize: none;
  outline: none;
  width: ${({ width }) => (typeof width === "number" ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === "number" ? `${height}rem` : height};
  border: none;
  background-color: ${({ theme }) => theme.colors.mostLight};
  border-radius: 2.5rem;
  padding: 3rem;
  ${({ theme }) => theme.fonts.body2};
  &[contenteditable]:empty:before {
    content: attr(placeholder);
    color: ${({ theme }) => theme.colors.gray500};
    ${({ theme }) => theme.fonts.caption1};
  }
`;
