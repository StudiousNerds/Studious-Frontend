import { GET } from "apis/api";

export const getMainStudyCafeItems = async () => {
  const { data } = await GET(`/studycafes?size=10`);
  return data;
};
