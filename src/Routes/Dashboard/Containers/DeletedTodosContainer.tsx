import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "../Todos/Todo";

const DeletedTodosContainer = () => {
  const { todoList } = useTodoContext();
  return (
    <div className="finished-todos-container flex flex-wrap items-start justify-start gap-2">
      {todoList.map(
        (todo) => todo.deleted === true && <Todo key={todo.id} {...todo} />
      )}
    </div>
  );
};

export default DeletedTodosContainer;
