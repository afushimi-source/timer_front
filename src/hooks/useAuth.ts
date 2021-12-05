import { useCallback } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import { LoginUser } from "types/api/loginUser";
import { SignUpUser } from "types/api/signUpUser";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./providers/useAuthProvider";
import client from "lib/api/client";

export const useAuth = () => {
  const { showMessage } = useMessage();
  const { setCurrentUser, setIsLogin, setLoading, loading, isLogin } =
    useLoginUser();
  const history = useHistory();

  const signup = useCallback(
    (signupParams: SignUpUser) => {
      setLoading(true);
      client
        .post("auth", signupParams)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setCurrentUser(res.data.user);
            showMessage({
              title: "ユーザー登録に成功しました",
              status: "success",
            });
            history.push("/home/setting");
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
    [history, setLoading, setCurrentUser, showMessage],
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
            setCurrentUser(res.data.user);
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
    [history, showMessage, setCurrentUser, setLoading, setIsLogin],
  );

  // const updateProfile = useCallback((user_params: User) => {
  // }, [])

  const getCurrentUser = useCallback(() => {
    if (
      !Cookies.get("_access_token") ||
      !Cookies.get("_client") ||
      !Cookies.get("_uid")
    )
      return;

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
          console.log(isLogin);
          setCurrentUser(res.data.data);
          setIsLogin(true);
          console.log(isLogin);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { signup, login, getCurrentUser, loading };
};
