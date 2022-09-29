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
          todo.archived === true && (
            <Todo
              key={todo.id}
              // todoId={todo.id}
              // todoContent={todo.content}
              // todoTitle={todo.title}
              // todoDone={todo.completed}
              // todoDeleted={todo.deleted}
              // todoArchived={todo.archived}
              {...todo}
            />
          )
        );
      })}
    </div>
  );
};

export default ArchivedTodosContainer;
