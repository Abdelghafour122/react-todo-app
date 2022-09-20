import React from "react";

type Props = {
  message: string;
};

const Message = ({ message }: Props) => {
  return <p className="text-center text-lg text-stone-400">{message}</p>;
};

export default Message;
