import { useMutation, useQuery } from "react-query";
import { getReservation, postReservation } from "apis/reservation";
import { useNavigate } from "react-router-dom";

export const useReservationQuery = ({ cafeId, roomId, token }) => {
  const queryKey = ["useReservation", { cafeId, roomId, token }];
  return useQuery(queryKey, () => getReservation({ cafeId, roomId, token }), {
    enabled: !!cafeId && !!roomId && !!token,
  });
};

export const useReservationMutation = ({ cafeId, roomId, token, body }) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["postReservation", { cafeId, roomId, body }],
    mutationFn: async () => {
      const data = await postReservation({ cafeId, roomId, token, body });
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        navigate(
          `/studyCafe/${cafeId}/payment?amount=${data?.amount}&orderId=${data?.orderId}&orderName=${data?.orderName}`
        );
      }
    },
  });
};
