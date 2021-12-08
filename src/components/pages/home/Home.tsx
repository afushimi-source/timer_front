import React, { VFC, memo, useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Text, Box, Flex, Tag } from "@chakra-ui/react";
import { useTimer } from "react-timer-hook";

import { TimerWrapper } from "components/molecules/TimerWrapper";
import { useSetTime } from "hooks/useSetTime";
import { timerState } from "globalState/atoms/timerAtom";
import { timestampState } from "globalState/atoms/timestampAtom";
import { isBreakState } from "globalState/atoms/isBreakAtom";
import { useAuth } from "hooks/useAuth";
import { PrimaryButton } from "components/atoms/button/PrimaryButton";
import { SecondaryButton } from "components/atoms/button/SecondaryButton";
import { UnitText } from "components/atoms/span/UnitText";

export const Home: VFC = memo(() => {
  const { checkLogin } = useAuth();
  const { getTimer } = useSetTime();
  const timerValue = useRecoilValue(timerState);
  const [timestamp, setTimestamp] = useRecoilState(timestampState);
  const [isBreak, setIsBreak] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useState(false);

  useEffect(() => {
    checkLogin();
    getTimer();
  }, [checkLogin, getTimer]);

  const CountdownTimer = () => {
    let time: Date = new Date();
    let measureTime = isBreak ? timerValue.breakTime : timerValue.studyTime;
    let expiryTimestamp: Date =
      timestamp ||
      new Date(time.setSeconds(time.getSeconds() + measureTime * 60));

    const isAutoStart = isBreak || timestamp !== null ? true : false;
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
      autoStart: isAutoStart,
      onExpire: () => {
        setIsBreak(!isBreak);
        setIsPause(false);
        setTimestamp(null);
      },
    });

    // 画面推移後もtimerを維持
    if (isRunning) {
      setTimestamp(expiryTimestamp);
    }

    const reset = () => {
      time = new Date();
      restart(
        new Date(
          time.setSeconds(time.getSeconds() + timerValue.studyTime * 60),
        ),
      );
      pause();
      setTimestamp(null);
      setIsBreak(false);
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
        <Flex justify="flex-start">
          <Tag size="lg">{isBreak ? "休憩" : "計測"}</Tag>
        </Flex>
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

  return (
    <TimerWrapper>
      <CountdownTimer />
    </TimerWrapper>
  );
});
