import { GET } from "./api";

export const getPaymentSuccess = async ({
  amount,
  paymentKey,
  orderId,
  token,
}) => {
  const { data } = await GET(
    `/studious/payments/success?amount=${amount}&paymentKey=${paymentKey}&orderId=${orderId}`,
    token
  );
  return data;
};

export const getVirtualPaymentSuccess = async ({
  amount,
  paymentKey,
  orderId,
  token,
}) => {
  const { data } = await GET(
    `/studious/payments/virtual/success?amount=${amount}&paymentKey=${paymentKey}&orderId=${orderId}`,
    token
  );
  return data;
};
