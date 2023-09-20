import { useQuery } from "react-query";
import { getPaymentSuccess, getVirtualPaymentSuccess } from "apis/payment";

export const usePaymentSuccessQuery = ({
  amount,
  paymentType,
  orderId,
  token,
}) => {
  return useQuery({
    queryKey: ["paymentSuccess", orderId],
    queryFn: async () => {
      const data = getPaymentSuccess({ amount, paymentType, orderId, token });
      return data;
    },
  });
};

export const useVirtualPaymentSuccessQuery = ({
  amount,
  paymentType,
  orderId,
  token,
}) => {
  return useQuery({
    queryKey: ["virtualPaymentSuccess", orderId],
    queryFn: async () => {
      const data = getVirtualPaymentSuccess({
        amount,
        paymentType,
        orderId,
        token,
      });
      return data;
    },
  });
};
