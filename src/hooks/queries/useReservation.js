import { useQuery } from "react-query";
import { getReservation } from "apis/reservation";

export const useReservationQuery = ({ cafeId, roomId, token }) => {
  const queryKey = ["useReservation", { cafeId, roomId, token }];
  return useQuery(queryKey, () => getReservation({ cafeId, roomId, token }));
};
