import { useQuery } from "react-query";
import {
  getStudyRoomReservation,
  getAllStudyRoomsReviews,
  getStudyRoomReviews,
  getRefundPolicy,
  getNotices,
} from "apis/studyCafeDetails";

export const useStudyRoomReservations = ({ studyCafeId, date }) => {
  return useQuery({
    queryKey: ["useStudyRoomReservations", { studyCafeId, date }],
    queryFn: () => getStudyRoomReservation({ studyCafeId, date }),
    enabled: !!studyCafeId,
  });
};

export const useAllStudyRoomsReviews = ({ studyCafeId, page, size }) => {
  return useQuery({
    queryKey: ["useAllStudyRoomsReviews", { studyCafeId, page, size }],
    queryFn: () => getAllStudyRoomsReviews({ studyCafeId, page, size }),
    enabled: !!studyCafeId && !!page && !!size,
  });
};

export const useStudyRoomReviews = ({
  studyCafeId,
  studyRoomId,
  page,
  size,
}) => {
  return useQuery({
    queryKey: ["useStudyRoomReviews", { studyCafeId, studyRoomId, page, size }],
    queryFn: () =>
      getStudyRoomReviews({ studyCafeId, studyRoomId, page, size }),
    enabled: !!studyCafeId && !!studyRoomId && !!page && !!size,
  });
};

export const useRefundPolicy = ({ studyCafeId }) => {
  return useQuery({
    queryKey: ["useRefundPolicy", { studyCafeId }],
    queryFn: () => getRefundPolicy({ studyCafeId }),
    enabled: !!studyCafeId,
  });
};

export const useNotices = ({ studyCafeId }) => {
  return useQuery({
    queryKey: ["useNotices", { studyCafeId }],
    queryFn: () => getNotices({ studyCafeId }),
    enabled: !!studyCafeId,
  });
};
