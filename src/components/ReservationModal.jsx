import React, { useState } from "react";
import styled from "styled-components";

const ReservationModal = ({ item, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const handleItemClick = (item) => {
    setClickedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={closeModal}>X</CloseButton>
          <ModalTextCafe>{item.studycafeName}</ModalTextCafe>
          <ModalTextRoom>{item.roomName}</ModalTextRoom>
          <ModalTextTime>
            {item.reservationDate} {item.reservationStartTime} -{" "}
            {item.reservationEndTime} ({item.usingTime})
          </ModalTextTime>
          <ModalTextAd>위치: </ModalTextAd>
          <ModalTextInfo>예약자 정보 </ModalTextInfo>
          <ModalTextAd>이름 </ModalTextAd>
          <ModalTextAd>전화번호 </ModalTextAd>
          <ModalText>결제 정보 </ModalText>
          <ModalTextAd>이용 금액 {item.price} </ModalTextAd>
          <Divider />
          <ModalText>총 결제 금액 {item.price}</ModalText>
          <ModalTextAd>결제 수단 {item.paymentMethod}</ModalTextAd>
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ReservationModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(16, 16, 16, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 75rem;
  height: 60rem;
  background-color: #fff;
  border-radius: 2.5rem;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 2.5rem;
  padding: 2rem;
`;

const ModalTextCafe = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold};
  color: ${({ theme }) => theme.colors.black};
  margin-left: 8rem;
`;

const ModalTextRoom = styled.div`
  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.black};
  margin-left: 8rem;
  margin-top: 1rem;
`;

const ModalTextTime = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.black};
  margin-left: 8rem;
  margin-top: 1rem;
`;

const ModalTextAd = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray500};
  margin-left: 8rem;
  margin-top: 1rem;
`;

const ModalTextInfo = styled.div`
  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.black};
  margin-left: 8rem;
  margin-top: 5rem;
`;

const ModalText = styled.div`
  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.black};
  margin-left: 8rem;
  margin-top: 2rem;
`;

const CloseButton = styled.button`
  margin: 2rem 67rem;
  background-color: #ffffff;
`;

const Divider = styled.div`
  width: 60rem;
  height: 0.05rem;
  background-color: ${({ theme }) => theme.colors.gray300};
  margin-top: 2rem;
  margin-left: 7rem;
`;

