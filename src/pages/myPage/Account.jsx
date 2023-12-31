import styled from "styled-components";
import TitleMainLayout from "components/layouts/TitleMainLayout";
import ProfileImg from "components/common/ProfileImg";
import {
  useMyPageAccount,
  useNicknameMutation,
  usePasswordMutation,
  usePhoneNumberMutation,
  useWithdrawMutation,
} from "hooks/queries/useMyPageAccount";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import { Button } from "components/common/Button";
import { useState, useEffect } from "react";
import useRedirectLogin from "hooks/useRedirectLogin";
import { comparePassword } from "utils/comparePassword";
import Modal from "components/common/Modal";
import Divider from "components/common/Divider";

const Account = () => {
  const { data } = useMyPageAccount();
  const { token, handleRedirect } = useRedirectLogin(true);
  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const useNickname = useNicknameMutation();
  const [isEditPhoneNumber, setIsEditPhoneNumber] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const usePhoneNumber = usePhoneNumberMutation();
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [passwordEditState, setPasswordEditState] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isPasswordCheckWrong, setIsPasswordCheckWrong] = useState(false);
  const usePassword = usePasswordMutation();
  const [isWithdrawClick, setIsWithdrawClick] = useState(false);
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const useWithdraw = useWithdrawMutation();
  const handleEditNicknameClick = () => {
    if (isEditNickname) {
      useNickname.mutate({ newNickname, token });
    }
    setIsEditNickname((isEdit) => !isEdit);
  };
  const handleEditPhoneNumberClick = () => {
    if (isEditPhoneNumber) {
      usePhoneNumber.mutate({ newPhoneNumber, token });
    }
    setIsEditPhoneNumber((isEdit) => !isEdit);
  };
  const handleEditPasswordClick = () => {
    const { oldPassword, newPassword } = passwordEditState;
    if (!isPasswordCheckWrong && passwordEditState.oldPassword) {
      if (isEditPassword) {
        usePassword.mutate({ oldPassword, newPassword, token });
      }
      setIsEditPassword((isEdit) => !isEdit);
    }
  };
  const handleCheckPasswordChange = (e) => {
    if (!comparePassword(passwordEditState.newPassword, e.target.value)) {
      setIsPasswordCheckWrong(true);
    } else {
      setIsPasswordCheckWrong(false);
    }
  };
  const handleDeleteClick = () => {
    setIsWithdrawClick(true);
  };
  return (
    <TitleMainLayout title={"계정관리"}>
      <AccountLayout>
        <AccountProfileImageSection>
          <ProfileImg imageSrc={data?.photo} size={18} />
          <SettingsIcon style={{ position: "absolute", right: 0 }} />
        </AccountProfileImageSection>
        <AccountInformationSection>
          <AccountInformationRow>
            <div>이름</div>
            <div className="account-data-column">{data?.name}</div>
          </AccountInformationRow>
          <AccountInformationRow>
            <div>닉네임</div>
            <div className="edit-column">
              {data?.nickname.trim()}
              {isEditNickname && (
                <EditInputBox
                  onChange={(e) => setNewNickname(e.target.value)}
                />
              )}
            </div>
            <div className="buttons-column">
              <Button
                text="수정하기"
                width={15}
                height={4}
                colorTheme="light"
                onClick={handleEditNicknameClick}
              />
              {isEditNickname && (
                <Button
                  text="수정 취소"
                  width={15}
                  height={4}
                  colorTheme="light"
                  onClick={() => setIsEditNickname(false)}
                />
              )}
            </div>
          </AccountInformationRow>
          <AccountInformationRow>
            <div>이메일</div>
            <div className="account-data-column">{data?.email}</div>
          </AccountInformationRow>
          <AccountInformationRow>
            <div>휴대전화</div>
            <div className="edit-column">
              {data?.phoneNumber}
              {isEditPhoneNumber && (
                <EditInputBox
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
              )}
            </div>
            <div className="buttons-column">
              <Button
                text="수정하기"
                width={15}
                height={4}
                colorTheme="light"
                onClick={handleEditPhoneNumberClick}
              />
              {isEditPhoneNumber && (
                <Button
                  text="수정 취소"
                  width={15}
                  height={4}
                  colorTheme="light"
                  onClick={() => setIsEditPhoneNumber(false)}
                />
              )}
            </div>
          </AccountInformationRow>
          <AccountInformationRow>
            <div>비밀번호</div>
            <div className="edit-column">
              {isEditPassword && (
                <>
                  <EditInputBox
                    type="password"
                    placeholder="기존 비밀번호"
                    onChange={(e) =>
                      setPasswordEditState((prevState) => ({
                        ...prevState,
                        oldPassword: e.target.value,
                      }))
                    }
                  />
                  <EditInputBox
                    type="password"
                    placeholder="변경할 비밀번호"
                    onChange={(e) =>
                      setPasswordEditState((prevState) => ({
                        ...prevState,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                  <EditInputBox
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={handleCheckPasswordChange}
                  />
                  {isPasswordCheckWrong && (
                    <GuideText>비밀번호가 일치하지 않습니다.</GuideText>
                  )}
                </>
              )}
            </div>
            <div className="buttons-column">
              <Button
                text="수정하기"
                width={15}
                height={4}
                colorTheme="light"
                onClick={handleEditPasswordClick}
              />
              {isEditPassword && (
                <Button
                  text="수정 취소"
                  width={15}
                  height={4}
                  colorTheme="light"
                  onClick={() => setIsEditPassword(false)}
                />
              )}
            </div>
          </AccountInformationRow>
        </AccountInformationSection>
      </AccountLayout>
      <DeleteAccountLayout>
        <DeleteAccountTitle>계정 삭제</DeleteAccountTitle>
        <DeleteAccountBox>
          <span>계정을 삭제하시면 예약한 스터디룸 내역이 전부 사라집니다.</span>
          <button onClick={handleDeleteClick}>삭제하기</button>
        </DeleteAccountBox>
      </DeleteAccountLayout>
      {isWithdrawClick && (
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
      )}
    </TitleMainLayout>
  );
};

export default Account;

const AccountLayout = styled.section`
  display: flex;
  gap: 4rem;
  ${({ theme }) => theme.fonts.heading2};
`;
const AccountProfileImageSection = styled.div`
  position: relative;
`;
const AccountInformationSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const AccountInformationRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 2fr;
  gap: 4rem;
  .account-data-column {
    grid-column: span 2;
  }
  .edit-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .buttons-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const DeleteAccountLayout = styled.section`
  margin-top: 5rem;
`;

const DeleteAccountTitle = styled.div`
  ${({ theme }) => theme.fonts.heading2Bold};
  margin-bottom: 2rem;
`;

const DeleteAccountBox = styled.div`
  width: 100%;
  border: 1px solid;
  padding: 2rem;
  border-radius: 2rem;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray300};
  display: flex;
  justify-content: space-between;
  button {
    padding: 0.2rem 2.3rem;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 1.2rem;
    ${({ theme }) => theme.fonts.body1Bold};
  }
`;

const EditInputBox = styled.input`
  width: 30rem;
  height: 4rem;
  ${({ theme }) => theme.fonts.body1};
  border: 1px solid ${({ theme }) => theme.colors.gray500};
  border-radius: 1.2rem;
  padding: 0 1rem;
`;

const GuideText = styled.span`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.mainDark};
`;

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
