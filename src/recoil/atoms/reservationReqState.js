import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const reservationReqState = atom({
  key: "reservationReqState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
