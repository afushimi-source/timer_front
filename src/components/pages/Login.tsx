import { memo, VFC, ChangeEvent, useState, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Input,
  Stack,
  Link,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { FormWrapper } from "../molecules/FormWrapper";
import { RightLink } from "../atoms/link/RightLink";
import { LoginUser } from "types/api/loginUser";
import { useLoginUser } from "hooks/providers/useAuthProvider";
import { loadingState } from "globalState/atoms/loadingAtom";

export const Login: VFC = memo(() => {
  const history = useHistory();
  const { isLogin } = useLoginUser();
  const { login } = useAuth();
  const loading = useRecoilValue(loadingState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });
  const onSubmitLoginUser: SubmitHandler<LoginUser> = (login_params) => {
    login(login_params);
    isLogin && reset();
  };
  const onClickSignup = useCallback(() => history.push("/signup"), []);

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
                required: {
                  value: true,
                  message: "passwordは必須項目です",
                },
              })}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <PrimaryButton loading={loading}>ログイン</PrimaryButton>
          <RightLink onClick={onClickSignup}>ユーザー登録画面へ</RightLink>
        </Stack>
      </form>
    </FormWrapper>
  );
});
