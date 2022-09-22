import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "./Todo";

type Props = {};

const DeletedTodosContainer = (props: Props) => {
  const { todoList } = useTodoContext();
  return (
    <div className="finished-todos-container flex flex-wrap items-start justify-start gap-2">
      {todoList.map(
        (todo) =>
          todo.deleted === true && (
            <Todo
              key={todo.id}
              todoId={todo.id}
              todoContent={todo.content}
              todoTitle={todo.title}
              todoDone={todo.completed}
              todoDeleted={todo.deleted}
            />
          )
      )}
    </div>
  );
};

export default DeletedTodosContainer;
