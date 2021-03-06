import { memo, VFC, ReactNode } from "react";
import { Flex, Box, Heading, Divider } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export const FormWrapper: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <Flex align="center" justify="center" height="80vh">
      <Box bg="while" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Timer
        </Heading>
        <Divider my={4} />
        {children}
      </Box>
    </Flex>
  );
});
