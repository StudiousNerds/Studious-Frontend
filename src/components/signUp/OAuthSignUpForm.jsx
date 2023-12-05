import { useState } from "react";
import styled from "styled-components";
import { useOAuthSignUpMutation } from "hooks/queries/useSignup";

const OAuthSignUpForm = ({ isOAuth, email, providerId, type }) => {
  const [signUpInfo, setSignUpInfo] = useState({
    email,
    name: "",
    nickname: "",
    providerId,
    type,
    phoneNumber: "",
    roles: ["USER"],
    birthday: "",
  });
  const handleOAuthSignUpMutation = useOAuthSignUpMutation(signUpInfo);
  const handleSignUp = (e) => {
    e.preventDefault();
    handleOAuthSignUpMutation.mutate();
  };
  const handleChangeName = (e) => {
    setSignUpInfo((info) => ({ ...info, name: e.target.value }));
  };
  const handleChangeNickname = (e) => {
    setSignUpInfo((info) => ({ ...info, nickname: e.target.value }));
  };
  const handleChangePhoneNumber = (e) => {
    setSignUpInfo((info) => ({ ...info, phoneNumber: e.target.value }));
  };
  const handleChangeBirthday = (e) => {
    setSignUpInfo((info) => ({ ...info, birthday: e.target.value }));
  };
  return (
    <SignUpLayoutContainer>
      <SignUpTitle>STUDIOUS 회원가입</SignUpTitle>
      <SignUpItem>
        <h1>
          이름 <span>*</span>
        </h1>
        <SignUpItemInput onChange={handleChangeName} />
      </SignUpItem>
      <SignUpItem>
        <h1>
          닉네임 <span>*</span>
        </h1>
        <SignUpItemInput placeholder="닉네임" onChange={handleChangeNickname} />
      </SignUpItem>
      <SignUpItem>
        <h1>
          생일 <span>*</span>
        </h1>
        <SignUpItemInput type="date" onChange={handleChangeBirthday} />
      </SignUpItem>
      <SignUpItem>
        <h1>
          휴대전화 <span>*</span>
        </h1>
        <SignUpItemInput
          placeholder="전화번호 입력(- 생략)"
          onChange={handleChangePhoneNumber}
        />
      </SignUpItem>
      <SignUpButton onClick={handleSignUp}>회원가입</SignUpButton>
    </SignUpLayoutContainer>
  );
};

export default OAuthSignUpForm;

const SignUpLayoutContainer = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SignUpTitle = styled.div`
  ${({ theme }) => theme.fonts.heading1Bold};
  margin-bottom: 2rem;
`;
const SignUpItem = styled.div`
  margin-bottom: 2rem;
  h1 {
    ${({ theme }) => theme.fonts.heading2};
    margin-bottom: 1.5rem;
    span {
      color: ${({ theme }) => theme.colors.mainDark};
    }
  }
`;
const SignUpItemInput = styled.input`
  display: box;
  width: 60rem;
  height: 6rem;
  padding-left: 2rem;
  margin: 0 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray800};
  border-radius: 1.5rem;
  ${({ theme }) => theme.fonts.body1};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
const SignUpButton = styled.button`
  margin-top: 5rem;
  width: 60rem;
  height: 6rem;
  border: 1px solid ${({ theme }) => theme.colors.mainDark};
  border-radius: 1.5rem;
  color: ${({ theme }) => theme.colors.mainDark};
  ${({ theme }) => theme.fonts.heading2Bold};
`;
