import styled from "styled-components";
import TitleMainLayout from "components/layouts/TitleMainLayout";
import ProfileImg from "components/common/ProfileImg";
import { useMyPageAccount } from "hooks/queries/useMyPageAccount";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import { Button } from "components/common/Button";

const Account = () => {
  const { data } = useMyPageAccount();
  const handleEditClick = () => {};
  const handleDeleteClick = () => {};
  return (
    <TitleMainLayout title={"계정관리"}>
      <AccountLayout>
        <AccountProfileImageSection>
          <ProfileImg imageSrc={data?.photo} size={18} />
          <SettingsIcon style={{ position: "absolute", right: 0 }} />
        </AccountProfileImageSection>
        <AccountInformationSection>
          <div>이름</div>
          <div>{data?.name}</div>
          <div>닉네임</div>
          <InformationColumn>
            <div>{data?.nickname}</div>
            <Button
              text="수정하기"
              width={15}
              height={4}
              colorTheme="light"
              onClick={handleEditClick}
            />
          </InformationColumn>
          <div>이메일</div>
          <div>{data?.email}</div>
          <div>휴대전화</div>
          <InformationColumn>
            <div>{data?.phoneNumber}</div>
            <Button
              text="수정하기"
              width={15}
              height={4}
              colorTheme="light"
              onClick={handleEditClick}
            />
          </InformationColumn>
          <div></div>
          <InformationColumn>
            <div />
            <Button
              text="비밀번호 변경하기"
              width={25}
              height={4}
              colorTheme="light"
              onClick={handleEditClick}
            />
          </InformationColumn>
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
  display: grid;
  grid-template-columns: 1fr 9fr;
  gap: 4rem;
`;

const InformationColumn = styled.div`
  display: flex;
  justify-content: space-between;
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
