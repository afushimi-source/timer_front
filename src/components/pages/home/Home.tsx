import React, { VFC, memo, useState, useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { Text, Box, Flex, Tag } from "@chakra-ui/react";
import { useTimer } from "react-timer-hook";

import { TimerWrapper } from "components/molecules/TimerWrapper";
import { useSetTime } from "hooks/useSetTime";
import { timerState } from "globalState/atoms/timerAtom";
import { useAuth } from "hooks/useAuth";
import { PrimaryButton } from "components/atoms/button/PrimaryButton";
import { SecondaryButton } from "components/atoms/button/SecondaryButton";
import { UnitText } from "components/atoms/span/UnitText";

export const Home: VFC = memo(() => {
  const { checkLogin } = useAuth();
  const { getTimer } = useSetTime();
  const timerValue = useRecoilValue(timerState);
  const [isStudy, setIsStudy] = useState(true);

  const StudyTimer = () => {
    const [isPause, setIsPause] = useState(false);
    let time: Date = new Date();
    let measureTime = isStudy ? timerValue.studyTime : timerValue.breakTime;
    let expiryTimestamp: Date = new Date(
      time.setSeconds(time.getSeconds() + measureTime * 60),
    );
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      resume,
      pause,
      restart,
    } = useTimer({
      expiryTimestamp,
      autoStart: !isStudy,
      onExpire: () => {
        setIsStudy(!isStudy);
        setIsPause(false);
      },
    });

    const reset = () => {
      time = new Date();
      restart(
        new Date(
          time.setSeconds(time.getSeconds() + timerValue.studyTime * 60),
        ),
      );
      pause();
      setIsPause(false);
    };

    const pauseHandler = () => {
      pause();
      setIsPause(true);
    };

    const resumeHandler = () => {
      resume();
      setIsPause(false);
    };

    const flexStyle = {
      gap: "10px",
    };

    return (
      <Box style={{ textAlign: "center" }}>
        <Flex justify="center" fontSize="75px">
          {days !== 0 && (
            <Text>
              {days}
              <UnitText>日</UnitText>
            </Text>
          )}
          {hours !== 0 && (
            <Text>
              {hours}
              <UnitText>時間</UnitText>
            </Text>
          )}
          <Text>
            {minutes}
            <UnitText>分</UnitText>
          </Text>
          <Text>
            {seconds}
            <UnitText>秒</UnitText>
          </Text>
        </Flex>
        <Flex style={flexStyle} justify="center">
          {isRunning ? (
            <SecondaryButton onClick={pauseHandler}>pause</SecondaryButton>
          ) : isPause ? (
            <PrimaryButton onClick={resumeHandler}>resume</PrimaryButton>
          ) : (
            <PrimaryButton onClick={start}>start</PrimaryButton>
          )}
          <SecondaryButton bg="gray.400" onClick={reset}>
            reset
          </SecondaryButton>
        </Flex>
      </Box>
    );
  };

  useLayoutEffect(() => {
    checkLogin();
    getTimer();
  }, []);

  return (
    <TimerWrapper>
      <Flex justify="flex-start">
        <Tag size="lg">{isStudy ? "計測" : "休憩時間"}</Tag>
      </Flex>
      <StudyTimer />
    </TimerWrapper>
  );
});
