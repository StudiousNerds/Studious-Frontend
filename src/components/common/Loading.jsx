import styled from "styled-components";

const Loading = () => {
  return (
    <LoaderLayout>
      <Loader />
    </LoaderLayout>
  );
};

export default Loading;

const LoaderLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(61, 61, 61, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const Loader = styled.span`
  width: 15rem;
  height: 15rem;
  border: 1rem solid ${({ theme }) => theme.colors.gray200};
  border-bottom-color: ${({ theme }) => theme.colors.mainDark};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  z-index: 10000;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
