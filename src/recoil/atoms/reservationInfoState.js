import { atom } from "recoil";

export const reservationInfoState = atom({
  key: "reservationInfoState",
  default: {
    cafeId: 0,
    roomId: 0,
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    headcount: 0,
    price: 0,
  },
});
