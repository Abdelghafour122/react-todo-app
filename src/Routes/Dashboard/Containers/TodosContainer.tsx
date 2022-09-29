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
          todo.archived === false && (
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
      )}
    </div>
  );
};

export default TodosContainer;
