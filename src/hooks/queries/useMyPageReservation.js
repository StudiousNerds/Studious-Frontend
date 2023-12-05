import { useMutation, useQuery } from "react-query";
import {
  postReservationModify,
  getPreviousReservationInfo,
} from "apis/reservationModify";
import { getMyPageReservation } from 'apis/myPageReservation';
import { getToken } from "utils/cookie";
import {
  getPreviousReservationInfoCancel,
  postReservationCancel,
} from "apis/reservationCancel";

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

export const useReservationCancelMutation = ({ reservationId, body }) => {
  const token = getToken();
  return useMutation(postReservationCancel({ reservationId, body, token }));
};

export const useReservationCancelQuery = ({ reservationId }) => {
  const token = getToken();
  return useMutation(
    getPreviousReservationInfoCancel({ reservationId, token })
  );
};
