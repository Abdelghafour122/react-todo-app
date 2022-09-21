import React, { useState } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";

import Todo from "./Todos/Todo";
import Message from "./Todos/Message";
import TodoForm from "./Todos/TodoForm";
import TodosContainer from "./Todos/TodosContainer";

type Props = {};

const Todos = (props: Props) => {
  const { todoList } = useTodoContext();
  const [openTodoForm, setOpenTodoForm] = useState(false);

  const handleCloseTodoForm = () => {
    return setOpenTodoForm(false);
  };

  const handleOpenTodoForm = () => {
    return setOpenTodoForm(true);
  };

  return (
    <div className="todos my-3">
      <div className="container">
        {openTodoForm ? (
          <TodoForm
            handleOpen={handleOpenTodoForm}
            handleClose={handleCloseTodoForm}
          />
        ) : (
          <div className="form-note flex items-center justify-center gap-2">
            <Message message={"Click to add a todo"} />
            <button className="button" onClick={handleOpenTodoForm}>
              Open
            </button>
          </div>
        )}
        <div className="w-full flex flex-wrap gap-2 justify-center mt-8">
          {todoList.length === 0 ? (
            <Message message={"Your todos will show up here!"} />
          ) : (
            <TodosContainer />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
