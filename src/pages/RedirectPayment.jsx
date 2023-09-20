import {
  usePaymentSuccessQuery,
  useVirtualPaymentSuccessQuery,
} from "hooks/queries/usePayment";
import { useSearchParams } from "react-router-dom";

const RedirectPayment = ({ status, virtual }) => {
  const [searchParams] = useSearchParams();
  const paymentQuery = usePaymentSuccessQuery;
  const virtualPaymentQuery = useVirtualPaymentSuccessQuery;
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId");
  const paymentType = searchParams.get("paymentType");
  if (status === "success") {
    if (virtual) {
      virtualPaymentQuery({ amount, orderId, paymentType });
    } else {
      paymentQuery({ amount, orderId, paymentType });
    }
  }

  return <></>;
};

export default RedirectPayment;
