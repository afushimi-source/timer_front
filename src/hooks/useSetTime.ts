import { useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { useMessage } from "./useMessage";
import { timerState } from "globalState/atoms/timerAtom";
import client from "lib/api/client";
import { Timer } from "types/api/timer";
import { timestampState } from "globalState/atoms/timestampAtom";

export const useSetTime = () => {
  const [timerValue, setTimerValue] = useRecoilState(timerState);
  const timestamp = useRecoilValue(timestampState);
  const { showMessage } = useMessage();
  const history = useHistory();

  const getTimer = useCallback(() => {
    if (timerValue.studyTime !== -1 || timerValue.breakTime !== -1)
      return timerValue;
    console.log("getTimer");
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
            setTimerValue({
              studyTime: res.data.studyTime,
              breakTime: res.data.breakTime,
            });
          } else {
            // setTimerValue({
            //   studyTime: 0,
            //   breakTime: 0,
            // });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [timerValue, setTimerValue]);

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
            setTimerValue({
              studyTime: res.data.studyTime,
              breakTime: res.data.breakTime,
            });
            if (timestamp === null) {
              showMessage({ title: "設定に成功しました", status: "success" });
            } else {
              showMessage({
                title:
                  "設定に成功しましたが既にtimerがスタートしているので次回から変更されます",
                status: "success",
              });
            }
            history.push("/home");
          } else {
            showMessage({ title: "設定できません", status: "error" });
          }
        })
        .catch(() => {
          showMessage({ title: "設定できません", status: "error" });
        });
    },
    [setTimerValue, history, showMessage, timestamp],
  );

  return { getTimer, postTimer };
};
