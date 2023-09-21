import { useQuery } from "react-query";
import { getPaymentSuccess, getVirtualPaymentSuccess } from "apis/payment";

export const useRedirectPayment = ({
  orderId,
  paymentKey,
  amount,
  status,
  virtual,
  token,
}) => {
  return useQuery({
    queryKey: ["useRedirectPayment", orderId],
    queryFn: async () => {
      if (virtual) {
        const data = getVirtualPaymentSuccess({
          orderId,
          paymentKey,
          amount,
          token,
        });
        return data;
      }
      const data = getPaymentSuccess({
        orderId,
        paymentKey,
        amount,
        token,
      });
      return data;
    },
    enabled: status === "success",
  });
};
