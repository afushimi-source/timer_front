import { memo, VFC } from "react";
import { Flex, Heading, Box, Link, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useAuth } from "hooks/useAuth";

export const Header: VFC = memo(() => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();

  const onClickHome = () => history.push("/home");
  const onClickRecord = () => history.push("/home/record");
  const onClickSetting = () => history.push("/home/setting");
  const onClickLogout = () => logout();
  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            Timer
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link onClick={onClickHome}>ホーム</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickRecord}>記録</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickSetting}>設定</Link>
          </Box>
          <Link onClick={onClickLogout}>ログアウト</Link>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
});
