import { useMutation, useQuery } from "react-query";
import { getReservation, postReservation } from "apis/reservation";

export const useReservationQuery = ({ cafeId, roomId, token }) => {
  const queryKey = ["useReservation", { cafeId, roomId, token }];
  return useQuery(queryKey, () => getReservation({ cafeId, roomId, token }), {
    enabled: !!cafeId && !!roomId && !!token,
  });
};

export const useReservationMutation = ({ cafeId, roomId, token, body }) => {
  return useMutation({
    mutationKey: ["postReservation", { cafeId, roomId, body }],
    mutationFn: async () => {
      await postReservation({ cafeId, roomId, token, body });
    },
  });
};
