import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "../Todos/Todo";

type Props = {};

const FinishedTodosContainer = (props: Props) => {
  const { todoList } = useTodoContext();
  return (
    <div className="finished-todos-container flex flex-wrap items-start justify-start gap-2">
      {todoList.map(
        (todo) =>
          todo.completed === true &&
          todo.deleted === false &&
          todo.archived === false && (
            <Todo
              key={todo.id}
              todoId={todo.id}
              todoContent={todo.content}
              todoTitle={todo.title}
              todoDone={todo.completed}
            />
          )
      )}
    </div>
  );
};

export default FinishedTodosContainer;
