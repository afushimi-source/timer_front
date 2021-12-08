import { memo, VFC } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { useAuth } from "hooks/useAuth";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { onClose, isOpen } = props;
  const history = useHistory();
  const { logout } = useAuth();

  const onClickHome = () => history.push("/home");
  const onClickRecord = () => history.push("/home/record");
  const onClickSetting = () => history.push("/home/setting");
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>メニュー</DrawerHeader>
          <DrawerBody>
            <Button w="100%" mb={5} onClick={onClickHome}>
              ホーム
            </Button>
            <Button w="100%" mb={5} onClick={onClickRecord}>
              記録
            </Button>
            <Button w="100%" mb={5} onClick={onClickSetting}>
              設定
            </Button>
            <Button w="100%" mb={5} onClick={logout}>
              ログアウト
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
