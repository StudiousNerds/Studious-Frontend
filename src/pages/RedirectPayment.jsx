import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "components/common/Loading";
import { useRedirectPayment } from "hooks/queries/useRedirectPayment";
import { getCookie } from "utils/cookie";
import Divider from "components/common/Divider";
import { Button } from "components/common/Button";

const RedirectPayment = ({ status, virtual }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  console.log("virtual", virtual);
  const { data, isLoading } = useRedirectPayment({
    status,
    virtual,
    amount,
    orderId,
    paymentKey,
    token: getCookie("accessToken"),
  });

  if (status === "fail") {
    navigate(-1);
    return;
  }
  const usingDateTimeInfo = `${
    data?.placeInfo.date
  } ${data?.placeInfo.startTime.slice(0, 5)} - ${data?.placeInfo.endTime.slice(
    0,
    5
  )}`;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <PaymentResultContainer>
          <MainTitle>결제가 완료되었습니다.</MainTitle>
          <MainInformationSection>
            <div className="title">{data?.placeInfo.studycafeName}</div>
            <div className="subTitle">{data?.placeInfo.roomName}</div>
            <div className="subTitle">{usingDateTimeInfo}</div>
            <div className="caption">{data?.placeInfo.address}</div>
          </MainInformationSection>
          <Divider margin={3} />
          <SubInformationSection>
            <div className="title">예약자 정보</div>
            <div className="infoRow">
              <span>이름</span>
              <span>{data?.reserveUserInfo.name}</span>
            </div>
            <div className="infoRow">
              <span>전화번호</span>
              <span>{data?.reserveUserInfo.phoneNumber}</span>
            </div>
            <Divider margin={3} />
            <div className="title">결제 정보</div>
            <div className="infoRow">
              <span>총 결제 금액</span>
              <span>{data?.paymentInfo.price}</span>
            </div>
            <div className="infoRow">
              <span>결제 수단</span>
              <span>{data?.paymentInfo.method}</span>
            </div>
            <div className="infoRow">
              <span>결제 완료 시간</span>
              <span>{data?.paymentInfo.completeTime}</span>
            </div>
          </SubInformationSection>
          <Button
            text="예약 내역보기"
            colorTheme="light"
            height={6}
            onClick={() => navigate("/myPage/reservation")}
          />
        </PaymentResultContainer>
      )}
    </>
  );
};

export default RedirectPayment;

const PaymentResultContainer = styled.div`
  padding: 10rem 20rem;
`;

const MainTitle = styled.div`
  ${({ theme }) => theme.fonts.logo};
  margin-bottom: 7rem;
`;

const MainInformationSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 5rem;
  .title {
    ${({ theme }) => theme.fonts.heading1Bold};
  }
  .subTitle {
    ${({ theme }) => theme.fonts.heading2};
  }
  .caption {
    ${({ theme }) => theme.fonts.body1};
    ${({ theme }) => theme.colors.gray500};
  }
`;

const SubInformationSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .title {
    ${({ theme }) => theme.fonts.heading2};
    margin-bottom: 1rem;
  }
  .infoRow {
    ${({ theme }) => theme.fonts.body1};
    display: flex;
    justify-content: space-between;
  }
  margin-bottom: 10rem;
`;
