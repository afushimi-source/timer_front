import { memo, VFC, ReactNode } from "react";
import { Button } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import { loadingState } from "globalState/atoms/loadingAtom";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};
export const PrimaryButton: VFC<Props> = memo((props) => {
  const loading = useRecoilValue(loadingState);
  const { children, onClick = () => {} } = props;
  return (
    <Button
      type="submit"
      bg="teal.400"
      color="white"
      _hover={{ opacity: "0.8" }}
      isLoading={loading}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
