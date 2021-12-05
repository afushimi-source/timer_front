import { VFC, memo } from "react";
import Cookies from "js-cookie";

import { FormWrapper } from "../../molecules/FormWrapper";
import { useLoginUser } from "hooks/providers/useAuthProvider";

export const Home: VFC = memo(() => {
  const { isLogin, currentUser } = useLoginUser();
  return (
    <FormWrapper>
      <p>{"login!"}</p>
      <p>{currentUser}</p>
      <p>{Cookies.get("_access_token")}</p>
      <p>{Cookies.get("_client")}</p>
      <p>{Cookies.get("_uid")}</p>
    </FormWrapper>
  );
});
