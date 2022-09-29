import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "../Todos/Todo";

type Props = {};

const TodosContainer = (props: Props) => {
  const { todoList } = useTodoContext();
  return (
    <div className="todos-container flex flex-wrap items-start justify-start gap-2">
      {todoList.map(
        (todo) =>
          todo.completed === false &&
          todo.deleted === false &&
          todo.archived === false && <Todo key={todo.id} {...todo} />
      )}
    </div>
  );
};

export default TodosContainer;
