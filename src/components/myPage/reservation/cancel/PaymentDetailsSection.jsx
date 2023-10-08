import styled from "styled-components";
import { Title } from "components/common/Title";

const PaymentDetailsSection = () => {
  return (
    <Section>
      <Title>결제 내역</Title>
      <PaymentDetailsBox>
        <PaymentDetailsRow>
          <span>총 결제 금액</span>
          <span></span>
        </PaymentDetailsRow>
        <PaymentDetailsRow>
          <span>결제 정보</span>
          <span>2023.10.08</span>
          <span>간편 결제 (카카오페이)</span>
        </PaymentDetailsRow>
        <PaymentDetailsRow>
          <span></span>
          <span>2023.10.08</span>
          <span>신용카드 결제 (우리카드)</span>
        </PaymentDetailsRow>
        <PaymentDetailsRow>
          <span>환불 수수료</span>
          <span>- 5,000원</span>
        </PaymentDetailsRow>
        <PaymentDetailsRow>
          <span>환불 예정 금액</span>
          <span>25,800원</span>
        </PaymentDetailsRow>
      </PaymentDetailsBox>
    </Section>
  );
};

export default PaymentDetailsSection;

const Section = styled.section``;

const PaymentDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  div.details-row {
    display: flex;
    justify-content: space-between;
  }
`;

const PaymentDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
