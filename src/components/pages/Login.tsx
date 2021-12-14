import { memo, VFC, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Input, Stack, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { FormWrapper } from "../molecules/FormWrapper";
import { RightLink } from "../atoms/link/RightLink";
import { LoginUser } from "types/api/loginUser";
import { isLoginState } from "globalState/atoms/isLoginAtom";

export const Login: VFC = memo(() => {
  const history = useHistory();
  const isLogin = useRecoilValue(isLoginState);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUser>({});
  const onSubmitLoginUser: SubmitHandler<LoginUser> = (login_params) => {
    login(login_params);
    isLogin && reset();
  };
  const onClickSignup = useCallback(() => history.push("/signup"), [history]);

  console.log(process.env.REACT_APP_URL);
  console.log(process.env.REACT_APP_DEV_API_URL);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmitLoginUser)}>
        <Stack spacing={6} py={4} px={10}>
          <FormControl isInvalid={!!errors?.email}>
            <Input
              placeholder="メールアドレス"
              {...register("email", {
                required: {
                  value: true,
                  message: "emailは必須項目です",
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "メールアドレスの形式が不正です",
                },
              })}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.password}>
            <Input
              type="password"
              placeholder="パスワード"
              {...register("password", {
                required: "passwordは必須項目です",
                minLength: {
                  value: 6,
                  message: "パスワードは6文字以上で設定してください",
                },
              })}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <PrimaryButton>ログイン</PrimaryButton>
          <RightLink onClick={onClickSignup}>ユーザー登録画面へ</RightLink>
        </Stack>
      </form>
    </FormWrapper>
  );
});
