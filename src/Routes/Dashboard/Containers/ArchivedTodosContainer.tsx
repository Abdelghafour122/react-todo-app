import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "../Todos/Todo";

type Props = {};

const ArchivedTodosContainer = (props: Props) => {
  const { todoList } = useTodoContext();
  return (
    <div className="archived-todos-container flex flex-wrap items-start justify-start gap-2">
      {todoList.map((todo) => {
        return (
          todo.deleted === false &&
          todo.archived === true && <Todo key={todo.id} {...todo} />
        );
      })}
    </div>
  );
};

export default ArchivedTodosContainer;
