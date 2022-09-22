import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "./Todo";

type Props = {};

const TodosContainer = (props: Props) => {
  const { todoList } = useTodoContext();
  return (
    <div className="todos-container flex flex-wrap items-start justify-start gap-2">
      {todoList.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todoId={todo.id}
            todoContent={todo.content}
            todoTitle={todo.title}
            todoDone={todo.completed}
          />
        );
      })}
    </div>
  );
};

export default TodosContainer;
