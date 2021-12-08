import { atom } from "recoil";

import { Timer } from "types/api/timer";

type FetchTimer = Timer & { createdAt: string };
export const recordsState = atom<Array<FetchTimer>>({
  key: "recordsState",
  default: [],
});
