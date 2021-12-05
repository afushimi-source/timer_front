import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Input, Stack, FormControl, FormErrorMessage } from "@chakra-ui/react";

import { PrimaryButton } from "components/atoms/button/PrimaryButton";
import { useAuth } from "hooks/useAuth";
import { FormWrapper } from "components/molecules/FormWrapper";
import { SignUpUser } from "types/api/signUpUser";
import { RightLink } from "components/atoms/link/RightLink";
import { useRecoilValue } from "recoil";
import { isLoginState } from "globalState/atoms/isLoginAtom";

export const Sighup = () => {
  const { signup } = useAuth();
  const isLogin = useRecoilValue(isLoginState);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<SignUpUser>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });

  const onSubmitUser: SubmitHandler<SignUpUser> = (params) => {
    signup(params);
    isLogin && reset();
  };

  const onClickLogin = useCallback(() => history.push("/"), [history]);

  console.log(errors);
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmitUser)}>
        <Stack spacing={6} py={4} px={10}>
          <FormControl isInvalid={!!errors?.nickname}>
            <Input
              placeholder="ニックネーム"
              {...register("nickname", {
                required: {
                  value: true,
                  message: "ニックネームは必須項目です",
                },
              })}
            />
            <FormErrorMessage>{errors?.nickname?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.email}>
            <Input
              placeholder="メールアドレス"
              {...register("email", {
                required: {
                  value: true,
                  message: "メールアドレスは必須項目です",
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
                  message: "パスワードは必須項目です",
                },
                minLength: {
                  value: 6,
                  message: "パスワードは6文字以上で設定してください",
                },
              })}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.passwordConfirmation}>
            <Input
              type="password"
              placeholder="パスワード（確認）"
              {...register("passwordConfirmation", {
                validate: {
                  message: (input) =>
                    input === getValues("password") ||
                    "パスワードと値が一致しません",
                },
                required: {
                  value: true,
                  message: "パスワード（確認）は必須項目です",
                },
              })}
            />
            <FormErrorMessage>
              {errors?.passwordConfirmation?.message}
            </FormErrorMessage>
          </FormControl>
          <PrimaryButton>ユーザー登録</PrimaryButton>
          <RightLink onClick={onClickLogin}>ログイン画面へ</RightLink>
        </Stack>
      </form>
    </FormWrapper>
  );
};
