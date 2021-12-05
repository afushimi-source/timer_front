import { VFC, memo } from "react";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";

import { FormWrapper } from "../../molecules/FormWrapper";
import { userNameState } from "globalState/atoms/userNameAtom";
import { isLoginState } from "globalState/atoms/isLoginAtom";
import { cookiesHeader } from "lib/api/cookiesHeader";

//test
import client from "lib/api/client";

export const Home: VFC = memo(() => {
  client
    .get("timers", {
      headers: cookiesHeader,
    })
    .then((res) => {
      console.log(res.data);
    });
  const username = useRecoilValue(userNameState);
  const login = useRecoilValue(isLoginState);
  console.log(username, login);
  return (
    <FormWrapper>
      <p>{login && "login!"}</p>
      <p>{username}</p>
      <p>{Cookies.get("_access_token")}</p>
      <p>{Cookies.get("_client")}</p>
      <p>{Cookies.get("_uid")}</p>
    </FormWrapper>
  );
});
