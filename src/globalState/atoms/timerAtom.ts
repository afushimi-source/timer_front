import { atom } from "recoil";

export const timerState = atom({
  key: "timerState",
  default: {
    studyTime: 0,
    breakTime: 0,
  },
});
