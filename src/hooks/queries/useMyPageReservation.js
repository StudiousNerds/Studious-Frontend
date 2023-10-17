import { useMutation, useQuery } from "react-query";
import {
  postReservationModify,
  getPreviousReservationInfo,
} from "apis/reservationModify";
import { getToken } from "utils/cookie";

export const useReservationModifyMutation = ({ reservationId, body }) => {
  const token = getToken();
  return useMutation(postReservationModify({ reservationId, body, token }));
};

export const useReservationModifyQuery = ({ reservationId }) => {
  const token = getToken();
  return useQuery(["useMyPageAccount"], () =>
    getPreviousReservationInfo({ reservationId, token })
  );
};
