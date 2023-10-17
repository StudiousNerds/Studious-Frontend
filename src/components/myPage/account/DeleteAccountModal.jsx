import { useState } from "react";
import styled from "styled-components";
import Divider from "components/common/Divider";
import { Button } from "components/common/Button";
import Modal from "components/common/Modal";
import { useWithdrawMutation } from "hooks/queries/useMyPageAccount";
import { getToken } from "utils/cookie";

const DeleteAccountModal = ({ setIsWithdrawClick }) => {
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const token = getToken();
  const useWithdraw = useWithdrawMutation();
  return (
    <Modal onClose={() => setIsWithdrawClick(false)} width={60} height={50}>
      <ModalContent>
        <div className="warn-title">정말로 계정을 삭제하시겠습니까?</div>
        <div className="warn-message">
          탈퇴 시 이벤트 정보 및 혜택을 받을 수 없습니다.
          <br />
          작성하신 리뷰와 예약 내역이 모두 복구되지 않습니다.
          <br />
          그래도 하시겠습니까?
        </div>
        <Divider length={52} />
        <div className="warn-message--sub">
          탈퇴를 위해 비밀번호를 입력해주세요.
        </div>
        <input
          type="password"
          onChange={(e) => setWithdrawPassword(e.target.value)}
        />
        <div className="button-layout">
          <Button
            text="탈퇴하기"
            width={15}
            height={4}
            onClick={() =>
              useWithdraw.mutate({ password: withdrawPassword, token })
            }
          />
          <Button
            text="돌아가기"
            colorTheme="light"
            width={15}
            height={4}
            onClick={() => setIsWithdrawClick(false)}
          />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAccountModal;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  .warn-title {
    ${({ theme }) => theme.fonts.heading1Bold};
  }
  .warn-message {
    text-align: center;
    ${({ theme }) => theme.fonts.heading2};
  }
  .warn-message--sub {
    ${({ theme }) => theme.fonts.body1};
  }
  .button-layout {
    display: flex;
    gap: 1rem;
  }
  input {
    height: 4rem;
    width: 31rem;
    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray500};
    padding: 0 1rem;
  }
`;
