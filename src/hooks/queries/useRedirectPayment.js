const { getPaymentSuccess, getVirtualPaymentSuccess } = require("apis/payment");
const { useQuery } = require("react-query");

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
        const data = getPaymentSuccess({ orderId, paymentKey, amount, token });
        return data;
      }
      const data = getVirtualPaymentSuccess({
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
