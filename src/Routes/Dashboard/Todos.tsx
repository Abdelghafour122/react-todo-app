import React from "react";
import { useTodoContext } from "../../Contexts/TodoContext";

import Todo from "./Todos/Todo";
import Message from "./Todos/Message";
import TodoForm from "./Todos/TodoForm";

type Props = {};

const Todos = (props: Props) => {
  const { todoList } = useTodoContext();

  return (
    <div className="todos mt-3">
      <div className="container">
        <TodoForm />
        <div className="todos-container w-full flex flex-wrap gap-2">
          {todoList.length === 0 ? (
            <Message message={"No todos to show!"} />
          ) : (
            <>
              {todoList.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todoId={todo.id}
                    todoContent={todo.content}
                    todoTitle={todo.title}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
