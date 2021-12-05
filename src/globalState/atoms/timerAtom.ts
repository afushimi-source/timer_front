import { atom } from "recoil";

export const timerState = atom({
  key: "timerState",
  default: {
    study_time: 0,
    break_time: 0,
  },
});
