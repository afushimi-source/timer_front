import { atom } from "recoil";

export const timerState = atom({
  key: "timerState",
  default: {
    studyTime: -1,
    breakTime: -1,
  },
});
