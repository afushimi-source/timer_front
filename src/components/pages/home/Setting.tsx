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

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { FormWrapper } from "../../molecules/FormWrapper";
import { Timer } from "../../../types/api/timer";
import { useLoginUser } from "hooks/providers/useAuthProvider";

export const Setting: VFC = memo(() => {
  const { loading } = useLoginUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Timer>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });
  const onSubmitLoginUser: SubmitHandler<Timer> = (timerParams) => {
    // setTime(timerParams);
    reset();
  };
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmitLoginUser)}>
        <Stack spacing={6} py={4} px={10}>
          <FormControl isInvalid={!!errors?.study_time}>
            <Input
              placeholder="計測時間"
              {...register("study_time", {
                required: {
                  value: true,
                  message: "計測時間は必須項目です",
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "メールアドレスの形式が不正です",
                },
              })}
            />
            <FormErrorMessage>{errors?.study_time?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.study_time}>
            <Input
              placeholder="休息時間"
              {...register("break_time", {
                required: {
                  value: true,
                  message: "休息時間は必須項目です",
                },
              })}
            />
            <FormErrorMessage>{errors?.break_time?.message}</FormErrorMessage>
          </FormControl>
          <PrimaryButton loading={loading}>ログイン</PrimaryButton>
        </Stack>
      </form>
    </FormWrapper>
  );
});
