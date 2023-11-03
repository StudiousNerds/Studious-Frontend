import { useState } from "react";
import styled from "styled-components";
import { useSignUpMutation } from "hooks/queries/useSignup";

const SignUpForm = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    name: "",
    password: "",
    nickname: "",
    phoneNumber: "",
    roles: ["USER"],
    birthday: "",
  });
  const handleSignUpMutation = useSignUpMutation(signUpInfo);
  const handleSignUp = (e) => {
    e.preventDefault();
    handleSignUpMutation.mutate();
  };
  const handleChangeEmail = (e) => {
    setSignUpInfo((info) => ({ ...info, email: e.target.value }));
  };
  const handleChangeName = (e) => {
    setSignUpInfo((info) => ({ ...info, name: e.target.value }));
  };
  const handleChangePassword = (e) => {
    setSignUpInfo((info) => ({ ...info, password: e.target.value }));
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
          이메일 <span>*</span>
        </h1>
        <SignUpItemInput onChange={handleChangeEmail} />
      </SignUpItem>
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
      <SignUpItem>
        <h1>
          비밀번호 <span>*</span>
        </h1>
        <SignUpItemInputBox>
          <SignUpItemInput
            type="password"
            placeholder="영문 + 숫자 + 특수문자의 조합 최소 10자"
            onChange={handleChangePassword}
          />
          <SignUpItemInput type="password" placeholder="비밀번호 재입력" />
        </SignUpItemInputBox>
      </SignUpItem>
      <SignUpButton onClick={handleSignUp}>회원가입</SignUpButton>
    </SignUpLayoutContainer>
  );
};

export default SignUpForm;

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
const SignUpItemInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
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
