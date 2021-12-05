import { memo, VFC, ReactNode } from "react";
import { Button } from "@chakra-ui/react";
import _ from "lodash";

type Props = {
  children: ReactNode;
  loading?: boolean;
};
export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, loading = false } = props;
  return (
    <Button
      type="submit"
      bg="teal.400"
      color="white"
      _hover={{ opacity: "0.8" }}
      isLoading={loading}
      disabled={loading}
    >
      {children}
    </Button>
  );
});
