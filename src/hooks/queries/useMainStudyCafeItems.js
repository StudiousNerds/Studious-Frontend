import { useQuery } from "react-query";
import { getMainStudyCafeItems } from "apis/main";

export const useMainStudyCafeItemsQuery = () => {
  return useQuery(["mainStudyCafeItems"], () => getMainStudyCafeItems());
};
