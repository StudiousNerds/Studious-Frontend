import styled from "styled-components";

/**
 *
 * @param {number} width
 * @param {number} height
 * @returns
 */
const Modal = ({ onClose, width, height }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        width={width}
        height={height}
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(61, 61, 61, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  overflow-y: auto;
  width: ${({ width }) => (typeof width === "number" ? `${width}rem` : width)};
  height: ${({ height }) =>
    typeof height === "number" ? `${height}rem` : height};
  background-color: #ffffff;
  border-radius: 2rem;
  z-index: 10000;
`;
