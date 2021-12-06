import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { useMessage } from "./useMessage";
import { timerState } from "globalState/atoms/timerAtom";
import client from "lib/api/client";
import { Timer } from "types/api/timer";

export const useSetTime = () => {
  const setTimer = useSetRecoilState(timerState);
  const { showMessage } = useMessage();
  const history = useHistory();

  const getTimer = useCallback(() => {
    client
      .get("timers", {
        headers: {
          "access-token": Cookies.get("_access_token")!,
          client: Cookies.get("_client")!,
          uid: Cookies.get("_uid")!,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data != null) {
            setTimer({
              studyTime: res.data.studyTime,
              breakTime: res.data.breakTime,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTimer]);

  const postTimer = useCallback(
    (params: Timer) => {
      client
        .post("timers", params, {
          headers: {
            "access-token": Cookies.get("_access_token")!,
            client: Cookies.get("_client")!,
            uid: Cookies.get("_uid")!,
          },
        })
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
