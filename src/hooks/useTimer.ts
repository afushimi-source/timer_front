import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessage";
import { timerState } from "globalState/atoms/timerAtom";
import client from "lib/api/client";
import { cookiesHeader } from "lib/api/cookiesHeader";
import { Timer } from "types/api/timer";

export const useTimer = () => {
  const setTimer = useSetRecoilState(timerState);
  const { showMessage } = useMessage();
  const history = useHistory();

  const getTimer = useCallback(() => {
    client
      .get("timers", {
        headers: cookiesHeader,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data != null) {
            setTimer({
              studyTime: res.data.studyTime,
              breakTime: res.data.breakTime,
            });
          }
        }
      });
  }, [setTimer]);

  const postTimer = useCallback(
    (params: Timer) => {
      client
        .post("timers", params, { headers: cookiesHeader })
        .then((res) => {
          if (res.status === 200) {
            setTimer({
              studyTime: res.data.studyTime,
              breakTime: res.data.breakTime,
            });
            showMessage({ title: "設定に成功しました", status: "success" });
            history.push("/home");
          } else {
            showMessage({ title: "設定できません", status: "error" });
          }
        })
        .catch(() => {
          showMessage({ title: "設定できません", status: "error" });
        });
    },
    [setTimer, history, showMessage],
  );

  return { getTimer, postTimer };
};
