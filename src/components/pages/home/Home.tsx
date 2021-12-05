import { VFC, memo, useEffect } from "react";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";

import { FormWrapper } from "../../molecules/FormWrapper";
import { userNameState } from "globalState/atoms/userNameAtom";
import { isLoginState } from "globalState/atoms/isLoginAtom";
import { useTimer } from "hooks/useTimer";
import { timerState } from "globalState/atoms/timerAtom";
import { useAuth } from "hooks/useAuth";

export const Home: VFC = memo(() => {
  const { checkLogin } = useAuth();
  const { getTimer } = useTimer();
  const username = useRecoilValue(userNameState);
  const login = useRecoilValue(isLoginState);
  const timerValue = useRecoilValue(timerState);
  console.log(username, login);
  console.log(timerValue);

  useEffect(() => {
    checkLogin();
    getTimer();
  }, []);
  return (
    <FormWrapper>
      <p>{login && "login!"}</p>
      <p>{username}</p>
      <p>{timerValue.studyTime}</p>
      <p>{timerValue.breakTime}</p>
      <p>{Cookies.get("_access_token")}</p>
      <p>{Cookies.get("_client")}</p>
      <p>{Cookies.get("_uid")}</p>
    </FormWrapper>
  );
});
