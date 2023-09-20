import { GET } from "./api";

export const getPaymentSuccess = async ({ amount, paymentType, orderId }) => {
  const { data } = await GET(
    `/studious/payments/success?amount=${amount}&paymentType=${paymentType}&orderId=${orderId}`
  );
  return data;
};

export const getVirtualPaymentSuccess = async ({
  amount,
  paymentType,
  orderId,
}) => {
  const { data } = await GET(
    `/studious/payments/virtual/success?amount=${amount}&paymentType=${paymentType}&orderId=${orderId}`
  );
  return data;
};
