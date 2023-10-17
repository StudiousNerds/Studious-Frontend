import { GET } from "apis/api";

export const getMainStudyCafeItems = async () => {
  const { data } = await GET(`/main`);
  return data;
};
