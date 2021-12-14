import { useCallback } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import { LoginUser } from "types/api/loginUser";
import { SignUpUser } from "types/api/signUpUser";
import { useMessage } from "./useMessage";
import client from "lib/api/client";
import { userNameState } from "globalState/atoms/userNameAtom";
import { isLoginState } from "globalState/atoms/isLoginAtom";
import { loadingState } from "globalState/atoms/loadingAtom";

export const useAuth = () => {
  const { showMessage } = useMessage();
  const setUserName = useSetRecoilState(userNameState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const setLoading = useSetRecoilState(loadingState);
  const history = useHistory();

  const signup = useCallback(
    (params: SignUpUser) => {
      setLoading(true);
      client
        .post("auth", params)
        .then((res) => {
          if (res.status === 200) {
            Cookies.set("_access_token", res.headers["access-token"]);
            Cookies.set("_client", res.headers["client"]);
            Cookies.set("_uid", res.headers["uid"]);
            setIsLogin(true);
            setUserName(res.data.data.nickname);
            showMessage({
              title: "ユーザー登録に成功しました",
              status: "success",
            });
            history.push("/home");
          } else {
            showMessage({ title: res.data.errors.join(""), status: "error" });
          }
          setLoading(false);
        })
        .catch(() => {
          showMessage({
            title: "サーバーエラーのため登録できません。",
            status: "error",
          });
          setLoading(false);
        });
    },
    [history, setLoading, setUserName, setIsLogin, showMessage],
  );

  const login = useCallback(
    (params: LoginUser) => {
      setLoading(true);
      client
        .post("auth/sign_in/", params)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.headers);
            Cookies.set("_access_token", res.headers["access-token"]);
            Cookies.set("_client", res.headers["client"]);
            Cookies.set("_uid", res.headers["uid"]);
            setUserName(res.data.data.nickname);
            setIsLogin(true);
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
          } else {
            showMessage({ title: res.data.errors.join(""), status: "error" });
          }
          setLoading(false);
        })
        .catch(() => {
          showMessage({ title: "ログインできません", status: "error" });
          setLoading(false);
        });
    },
    [history, showMessage, setUserName, setLoading, setIsLogin],
  );

  const logout = useCallback(() => {
    client
      .delete("auth/sign_out", {
        headers: {
          "access-token": Cookies.get("_access_token")!,
          client: Cookies.get("_client")!,
          uid: Cookies.get("_uid")!,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLogin(false);
          Cookies.remove("_access_token");
          Cookies.remove("_client");
          Cookies.remove("_uid");
          showMessage({ title: "ログアウトしました", status: "success" });
          history.push("/");
        } else {
          showMessage({ title: "ログアウトできませんでした", status: "error" });
        }
      })
      .catch((err) => {
        showMessage({ title: "ログアウトできませんでした", status: "error" });
        console.log(err);
      });
  }, [history, showMessage, setIsLogin]);

  const checkLogin = useCallback(() => {
    if (isLogin) return;

    client
      .get("auth/sessions", {
        headers: {
          "access-token": Cookies.get("_access_token")!,
          client: Cookies.get("_client")!,
          uid: Cookies.get("_uid")!,
        },
      })
      .then((res) => {
        if (res.data.isLogin === true) {
          setUserName(res.data.data.nickname);
          setIsLogin(true);
        } else {
          history.push("/");
        }
      })
      .catch((err) => {
        history.push("/");
      });
  }, [history, setIsLogin, setUserName, isLogin]);

  return { signup, login, logout, checkLogin };
};
