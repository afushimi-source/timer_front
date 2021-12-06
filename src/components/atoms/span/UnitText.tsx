import { VFC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const UnitText: VFC<Props> = (props) => {
  const { children } = props;
  const spanStyle = {
    color: "gray",
    fontSize: "20px",
  };
  return <span style={spanStyle}>{children}</span>;
};
