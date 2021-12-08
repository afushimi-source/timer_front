import { atom } from "recoil";

export const timestampState = atom<Date | null>({
  key: "timestampState",
  default: null,
});
