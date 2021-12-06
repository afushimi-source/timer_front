import { memo, VFC, ReactNode } from "react";
import { Flex, Box, Heading, Divider } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export const TimerWrapper: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <Flex align="center" justify="center" height={{ base: "45vh", md: "80vh" }}>
      <Box bg="while" w="lg" p={4} borderRadius="md" shadow="lg">
        <Heading as="h1" size="lg" textAlign="center">
          Timer
        </Heading>
        <Divider my={4} />
        {children}
      </Box>
    </Flex>
  );
});
