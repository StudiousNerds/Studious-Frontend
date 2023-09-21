import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { useSearchParams } from "react-router-dom";
import { Button } from "components/common/Button";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const price = searchParams.get("amount");
  const clientKey = process.env.REACT_APP_TOSS_API_CLIENT_KEY;
  const selector = "#payment-widget";

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: price }
      );

      paymentWidget.renderAgreement("#agreement");

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  return (
    <PaymentContainer>
      <div id="payment-widget" />
      <div id="agreement" />
      <Button
        width="30rem"
        height="5rem"
        text="결제하기"
        style={{ position: "absolute", right: 0 }}
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;
          try {
            await paymentWidget?.requestPayment({
              orderId: searchParams.get("orderId"),
              orderName: searchParams.get("orderName"),
              successUrl:
                paymentMethodsWidgetRef.current.getSelectedPaymentMethod()
                  .method === "가상계좌"
                  ? `${window.location.origin}/payments/virtual/success`
                  : `${window.location.origin}/payments/success`,
              failUrl:
                paymentMethodsWidgetRef.current.getSelectedPaymentMethod()
                  .method === "가상계좌"
                  ? `${window.location.origin}/payments/virtual/fail`
                  : `${window.location.origin}/payments/fail`,
            });
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </PaymentContainer>
  );
};

export default Payment;

const PaymentContainer = styled.div`
  position: relative;
`;
