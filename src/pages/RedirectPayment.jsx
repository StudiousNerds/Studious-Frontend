import {
  usePaymentSuccessQuery,
  useVirtualPaymentSuccessQuery,
} from "hooks/queries/usePayment";
import { useSearchParams } from "react-router-dom";
import { getCookie } from "utils/cookie";

const RedirectPayment = ({ status, virtual }) => {
  const [searchParams] = useSearchParams();
  const paymentQuery = usePaymentSuccessQuery;
  const virtualPaymentQuery = useVirtualPaymentSuccessQuery;
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId");
  const paymentType = searchParams.get("paymentType");
  if (status === "success") {
    if (virtual) {
      virtualPaymentQuery({
        amount,
        orderId,
        paymentType,
        token: getCookie("accessToken"),
      });
    } else {
      paymentQuery({
        amount,
        orderId,
        paymentType,
        token: getCookie("accessToken"),
      });
    }
  }

  return <></>;
};

export default RedirectPayment;
