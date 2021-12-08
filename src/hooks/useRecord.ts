import { useCallback } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { useMessage } from "./useMessage";
import client from "lib/api/client";
import { recordsState } from "globalState/atoms/recordsAtom";
import { Timer } from "types/api/timer";

export const useRecord = () => {
  const { showMessage } = useMessage();
  const setRecords = useSetRecoilState(recordsState);

  const getRecords = useCallback(() => {
    client
      .get("records", {
        headers: {
          "access-token": Cookies.get("_access_token")!,
          client: Cookies.get("_client")!,
          uid: Cookies.get("_uid")!,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setRecords(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setRecords]);

  const postRecord = useCallback(
    (params: Timer) => {
      client
        .post(
          "records",
          { record: params },
          {
            headers: {
              "access-token": Cookies.get("_access_token")!,
              client: Cookies.get("_client")!,
              uid: Cookies.get("_uid")!,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            showMessage({
              title: "お疲れ様です。記録に成功しました",
              status: "success",
            });
          } else {
            showMessage({ title: res.data.errors.join(""), status: "error" });
          }
        })
        .catch(() => {
          showMessage({ title: "記録に失敗しました", status: "error" });
        });
    },
    [showMessage],
  );

  return { getRecords, postRecord };
};
