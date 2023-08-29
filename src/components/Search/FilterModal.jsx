import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const FilterModal = ({ onClose }) => {
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <h2>편의시설</h2>
        {}
      </ModalContent>
    </ModalOverlay>
  );
};

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
  top: 50%;
  left: 50%;
  width: 40rem;
  height: 30rem;
  background-color: #ffffff;
  border-radius: 2rem;
  z-index: 10000;
`;

export default FilterModal;
