import React, { VFC, memo, useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Text, Box, Flex, Tag, Wrap, WrapItem } from "@chakra-ui/react";
import { useTimer } from "react-timer-hook";

import { TimerWrapper } from "components/molecules/TimerWrapper";
import { useSetTime } from "hooks/useSetTime";
import { useRecord } from "hooks/useRecord";
import { useMessage } from "hooks/useMessage";
import { timerState } from "globalState/atoms/timerAtom";
import { timestampState } from "globalState/atoms/timestampAtom";
import { isBreakState } from "globalState/atoms/isBreakAtom";
import { useAuth } from "hooks/useAuth";
import { PrimaryButton } from "components/atoms/button/PrimaryButton";
import { SecondaryButton } from "components/atoms/button/SecondaryButton";
import { UnitText } from "components/atoms/span/UnitText";

export const Home: VFC = memo(() => {
  const { checkLogin } = useAuth();
  const { postRecord } = useRecord();
  const { getTimer } = useSetTime();
  const { showMessage } = useMessage();
  const timerValue = useRecoilValue(timerState);
  const [timestamp, setTimestamp] = useRecoilState(timestampState);
  const [isBreak, setIsBreak] = useRecoilState(isBreakState);

  useEffect(() => {
    checkLogin();
    getTimer();
  }, [checkLogin, getTimer]);

  const CountdownTimer = () => {
    const [isPause, setIsPause] = useState(false);
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
        if (isBreak) {
          postRecord(timerValue);
        } else {
          showMessage({ title: "休憩しましょう", status: "success" });
        }
        setTimestamp(null);
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
      setTimestamp(null);
      setIsBreak(false);
      setIsPause(false);
    };

    const startHandler = () => {
      time = new Date();
      measureTime = isBreak ? timerValue.breakTime : timerValue.studyTime;
      setTimestamp(
        new Date(time.setSeconds(time.getSeconds() + measureTime * 60)),
      );
      start();
    };

    const pauseHandler = () => {
      pause();
      setIsPause(true);
    };

    const resumeHandler = () => {
      resume();
      setIsPause(false);
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
        <Wrap justify="center">
          <WrapItem>
            {isRunning ? (
              <SecondaryButton onClick={pauseHandler}>pause</SecondaryButton>
            ) : isPause ? (
              <PrimaryButton onClick={resumeHandler}>resume</PrimaryButton>
            ) : (
              <PrimaryButton onClick={startHandler}>start</PrimaryButton>
            )}
          </WrapItem>
          <WrapItem>
            <SecondaryButton bg="gray.400" onClick={reset}>
              reset
            </SecondaryButton>
          </WrapItem>
        </Wrap>
      </Box>
    );
  };

  return (
    <TimerWrapper>
      <CountdownTimer />
    </TimerWrapper>
  );
});
