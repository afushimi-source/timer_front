import { memo, VFC, useLayoutEffect } from "react";
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
import { useSetTime } from "hooks/useSetTime";
import { useAuth } from "hooks/useAuth";
import { timerState } from "globalState/atoms/timerAtom";

export const Setting: VFC = memo(() => {
  const { checkLogin } = useAuth();
  const { getTimer, postTimer } = useSetTime();
  const timer = useRecoilValue(timerState);
  console.log(timer);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Timer>({});

  const onSubmitLoginUser: SubmitHandler<Timer> = (params) => {
    postTimer(params);
    reset();
  };

  useLayoutEffect(() => {
    checkLogin();
    getTimer();
  }, []);

  useLayoutEffect(() => {
    setValue("studyTime", timer.studyTime);
    setValue("breakTime", timer.breakTime);
  }, [timer]);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmitLoginUser)}>
        <Stack spacing={6} py={4} px={10}>
          <FormControl isInvalid={!!errors?.studyTime}>
            <FormLabel>計測時間 (分 / min)</FormLabel>
            <Input
              // defaultValue={timerValue.studyTime}
              type="number"
              placeholder="計測時間 (分 / min)"
              {...register("studyTime", {
                required: {
                  value: true,
                  message: "計測時間は必須項目です",
                },
              })}
            />
            <FormHelperText>おすすめな設定は25分計測 / 5分休憩</FormHelperText>
            <FormErrorMessage>{errors?.studyTime?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.studyTime}>
            <FormLabel>休息時間 (分 / min)</FormLabel>
            <Input
              // defaultValue={timerValue.breakTime}
              type="number"
              placeholder="休息時間 (分 / min)"
              {...register("breakTime", {
                required: {
                  value: true,
                  message: "休息時間は必須項目です",
                },
              })}
            />
            <FormErrorMessage>{errors?.breakTime?.message}</FormErrorMessage>
          </FormControl>
          <PrimaryButton>設定</PrimaryButton>
        </Stack>
      </form>
    </FormWrapper>
  );
});
