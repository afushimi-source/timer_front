import { memo, VFC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import { PrimaryButton } from "components/atoms/button/PrimaryButton";
import { FormWrapper } from "components/molecules/FormWrapper";
import { Timer } from "types/api/timer";
import { useTimer } from "hooks/useTimer";
import { timerState } from "globalState/atoms/timerAtom";

export const Setting: VFC = memo(() => {
  const default_timer = useRecoilValue(timerState);
  const { getTimer, postTimer } = useTimer();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Timer>({});
  const onSubmitLoginUser: SubmitHandler<Timer> = (params) => {
    console.log(params);
    postTimer(params);
    reset();
  };

  useEffect(() => {
    getTimer();
  });

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmitLoginUser)}>
        <Stack spacing={6} py={4} px={10}>
          <FormControl isInvalid={!!errors?.study_time}>
            <FormLabel>計測時間 (分 / min)</FormLabel>
            <Input
              defaultValue={default_timer.study_time}
              // type="number"
              placeholder="計測時間 (分 / min)"
              {...register("study_time", {
                required: {
                  value: true,
                  message: "計測時間は必須項目です",
                },
              })}
            />
            <FormHelperText>おすすめな設定は25分計測 / 5分休憩</FormHelperText>
            <FormErrorMessage>{errors?.study_time?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.study_time}>
            <FormLabel>休息時間 (分 / min)</FormLabel>
            <Input
              defaultValue={default_timer.break_time}
              type="number"
              placeholder="休息時間 (分 / min)"
              {...register("break_time", {
                required: {
                  value: true,
                  message: "休息時間は必須項目です",
                },
              })}
            />
            <FormErrorMessage>{errors?.break_time?.message}</FormErrorMessage>
          </FormControl>
          <PrimaryButton>設定</PrimaryButton>
        </Stack>
      </form>
    </FormWrapper>
  );
});
