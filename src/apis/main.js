import { GET } from "apis/api";

export const getMainStudyCafeItems = async () => {
  const { data } = await GET(`/studious/main`);
  return data;
};
