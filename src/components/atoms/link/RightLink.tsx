import { VFC, ReactNode } from "react";
import { Link, Flex } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export const RightLink: VFC<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <Flex justify="flex-end">
      <Link
        color="blue.800"
        cursor="pointer"
        _hover={{ textDecoration: "none", opacity: "0.8" }}
        onClick={onClick}
      >
        {children}
      </Link>
    </Flex>
  );
};
