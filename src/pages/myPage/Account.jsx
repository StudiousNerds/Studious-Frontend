import styled from "styled-components";
import TitleMainLayout from "components/layouts/TitleMainLayout";
import ProfileImg from "components/common/ProfileImg";
import { useMyPageAccount } from "hooks/queries/useMyPageAccount";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import { Button } from "components/common/Button";

const Account = () => {
  const { data } = useMyPageAccount();
  const handleEditClick = () => {};
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
    </TitleMainLayout>
  );
};

export default Account;

const AccountLayout = styled.section`
  display: flex;
  gap: 4rem;
  ${({ theme }) => theme.fonts.heading2}
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
