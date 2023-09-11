import styled from "styled-components";
import TitleMainLayout from "components/layouts/TitleMainLayout";
import ProfileImg from "components/common/ProfileImg";
import {
  useMyPageAccount,
  useNicknameMutation,
} from "hooks/queries/useMyPageAccount";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import { Button } from "components/common/Button";
import { useState } from "react";

const Account = () => {
  const { data } = useMyPageAccount();
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const useNickname = useNicknameMutation();
  const handleEditNicknameClick = () => {
    if (isEditNickname) {
      useNickname.mutate(newNickname);
    }
    setIsEditNickname((isEditNickname) => !isEditNickname);
  };
  const handleEditClick = (infoType) => {
    if (infoType === "nickname") {
      if (isEditNickname) {
        useNickname.mutate(newNickname);
      }
      setIsEditNickname((isEditNickname) => !isEditNickname);
    }
  };
  const handleDeleteClick = () => {};
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
              {data?.nickname}
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
            <div>{data?.phoneNumber}</div>
            <Button
              text="수정하기"
              width={15}
              height={4}
              colorTheme="light"
              onClick={handleEditClick}
            />
          </AccountInformationRow>
          <AccountInformationRow>
            <div></div>
            <div />
            <Button
              text="비밀번호 변경하기"
              width={25}
              height={4}
              colorTheme="light"
              onClick={handleEditClick}
            />
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
