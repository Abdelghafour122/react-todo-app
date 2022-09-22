import React from "react";
import { useTodoContext } from "../../Contexts/TodoContext";

type Props = {};

const Trash = (props: Props) => {
  const { todoList } = useTodoContext();
  return (
    <div className="trashed-todos mt-3">
      <div className="container"></div>
    </div>
  );
};

export default Trash;
