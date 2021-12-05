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
  // const { setCurrentUser, setIsLogin, setLoading } = useLoginUser();
  const setUserName = useSetRecoilState(userNameState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const setLoading = useSetRecoilState(loadingState);
  const history = useHistory();

  const signup = useCallback(
    (signupParams: SignUpUser) => {
      setLoading(true);
      client
        .post("auth", signupParams)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setIsLogin(true);
            setUserName(res.data.user.nickname);
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
        .post("auth/sign_in", params)
        .then((res) => {
          if (res.status === 200) {
            Cookies.set("_access_token", res.headers["access-token"]);
            Cookies.set("_client", res.headers["client"]);
            Cookies.set("_uid", res.headers["uid"]);
            setUserName(res.data.user.nickname);
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

  // const updateProfile = useCallback((user_params: User) => {
  // }, [])

  const checkLogin = useCallback(() => {
    if (
      isLogin ||
      !Cookies.get("_access_token") ||
      !Cookies.get("_client") ||
      !Cookies.get("_uid")
    )
      return;
    console.log("check!");
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
          console.log(res.data.data);
          setUserName(res.data.data.nickname);
          setIsLogin(true);
        } else {
          history.push("/");
        }
      })
      .catch((err) => {
        history.push("/");
        console.log(err);
      });
  }, [setIsLogin, isLogin, history, setUserName]);

  return { signup, login, checkLogin };
};
