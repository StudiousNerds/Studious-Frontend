import styled from "styled-components";
import { Title } from "components/common/Title";
import { formatDateToString } from "utils/formatDate";

const PaymentDetailsSection = ({
  paymentRecord: { totalPrice, refundPrice, refundFee, payment },
}) => {
  return (
    <Section>
      <Title>결제 내역</Title>
      <PaymentDetailsBox>
        <PaymentDetailsRow>
          <span>총 결제 금액</span>
          <span>{totalPrice}</span>
        </PaymentDetailsRow>
        <PaymentDetailsRow>
          <span>결제 정보</span>
          <div className="multi-columns">
            <span>
              {formatDateToString(new Date(payment[0].completeTime), ".")}
            </span>
            <span>{`${payment[0].method} (${payment[0].price}원)`}</span>
          </div>
        </PaymentDetailsRow>
        {payment.slice(1).length > 0 &&
          payment.slice(1).map(({ price, method, completeTime }) => (
            <PaymentDetailsRow className="toRight">
              <div className="multi-columns">
                <span>{new Date(completeTime)}</span>
                <span>{`${method} (${price}원)`}</span>
              </div>
            </PaymentDetailsRow>
          ))}
        <PaymentDetailsRow>
          <span>환불 수수료</span>
          <span>{`-${refundFee}원`}</span>
        </PaymentDetailsRow>
        <PaymentDetailsRow>
          <span>환불 예정 금액</span>
          <span>{`${refundPrice}원`}</span>
        </PaymentDetailsRow>
      </PaymentDetailsBox>
    </Section>
  );
};

export default PaymentDetailsSection;

const Section = styled.section`
  ${({ theme }) => theme.fonts.body2};
  width: 100%;
  margin-bottom: 5rem;
`;

const PaymentDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div.details-row {
    display: flex;
    justify-content: space-between;
  }
`;

const PaymentDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  &.toRight {
    justify-content: flex-end;
  }
  .multi-columns {
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
`;
