import styled from "styled-components";

const DotLoader = ({ size = "12px" }) => {
  return <Loader size={size} />;
};

export default DotLoader;

const Loader = styled.span`
  width: ${({ size }) => (typeof size === "string" ? size : size + "rem")};
  height: ${({ size }) => (typeof size === "string" ? size : size + "rem")};
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  color: ${({ theme }) => theme.colors.mainDark};
  box-sizing: border-box;
  animation: animloader 1s linear infinite alternate;

  @keyframes animloader {
    0% {
      box-shadow: -38px -12px, -14px 0, 14px 0, 38px 0;
    }
    33% {
      box-shadow: -38px 0px, -14px -12px, 14px 0, 38px 0;
    }
    66% {
      box-shadow: -38px 0px, -14px 0, 14px -12px, 38px 0;
    }
    100% {
      box-shadow: -38px 0, -14px 0, 14px 0, 38px -12px;
    }
  }
`;
