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
  const onClickLog = () => history.push("/home/log");
  const onClickUsage = () => history.push("/home/usage");
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
            <Link onClick={onClickLog}>ログ</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickUsage}>使い方</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickLogout}>ログアウト</Link>
          </Box>
          <Link onClick={onClickSetting}>設定</Link>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
});
