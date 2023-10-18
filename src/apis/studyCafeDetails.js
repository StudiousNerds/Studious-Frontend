import { GET } from "./api";

/**
 * @param {studyCafeId} number
 * @param {date} string 2023-01-01
 * @returns 스터디룸 탭 정보
 */
export const getStudyRoomReservation = async ({ studyCafeId, date }) => {
  try {
    if (studyCafeId) {
      const { data } = await GET(
        `/studycafes/${studyCafeId}?date=${date || ""}`
      );
      return data;
    } else {
      throw new Error("studyCafeId를 전달하여 api를 호출해주세요.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllStudyRoomsReviews = async ({ studyCafeId, page, size }) => {
  try {
    if (studyCafeId && page && size) {
      const { data } = await GET(
        `/studycafes/${studyCafeId}/reviews?page=${page}&size=${size}`
      );
      return data;
    } else {
      throw new Error("studyCafeId, page, size를 전달하여 api를 호출해주세요.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getStudyRoomReviews = async ({
  studyCafeId,
  studyRoomId,
  page,
  size,
}) => {
  try {
    if (studyCafeId && studyRoomId && page && size) {
      const { data } = await GET(
        `/studycafes/${studyCafeId}/rooms/${studyRoomId}/reviews?page=${page}&size=${size}`
      );
      return data;
    } else {
      throw new Error(
        "studyCafeId, studyRoomId, page, size를 전달하여 api를 호출해주세요."
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const getRefundPolicy = async ({ studyCafeId }) => {
  try {
    if (studyCafeId) {
      const { data } = await GET(`/studycafes/${studyCafeId}/refundPolicy`);
      return data;
    } else {
      throw new Error("studyCafeId를 전달하여 api를 호출해주세요.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getNotices = async ({ studyCafeId }) => {
  try {
    if (studyCafeId) {
      const { data } = await GET(`/studycafes/${studyCafeId}/notice`);
      return data;
    } else {
      throw new Error("studyCafeId를 전달하여 api를 호출해주세요.");
    }
  } catch (error) {
    console.error(error);
  }
};
