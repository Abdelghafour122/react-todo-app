import React, { ReactNode } from "react";

type Props = { children: ReactNode };

const Container = ({ children }: Props) => {
  return <div className="w-[85vw] my-0 mx-auto px-2">{children}</div>;
};

export default Container;
