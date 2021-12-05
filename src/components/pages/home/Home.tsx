import { VFC, memo } from "react";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";

import { FormWrapper } from "../../molecules/FormWrapper";
import { userNameState } from "globalState/atoms/userNameAtom";
import { isLoginState } from "globalState/atoms/isLoginAtom";

export const Home: VFC = memo(() => {
  // const { isLogin, currentUser } = useLoginUser();
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
