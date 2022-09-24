import React, { useState, useEffect } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";
import DeletedTodosContainer from "./Todos/Containers/DeletedTodosContainer";
import Message from "./Todos/Message";

type Props = {};

const Trash = (props: Props) => {
  const { todoList } = useTodoContext();
  const [undeletedTodos, setUndeletedTodos] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    undeletedTodos === undefined ? setLoading(true) : setLoading(false);
  }, [undeletedTodos]);

  useEffect(() => {
    const checkForUndeletedTodos = () => {
      return todoList.every((todo) => todo.deleted === false);
    };
    setUndeletedTodos(() => checkForUndeletedTodos());
  }, [todoList]);

  return (
    <div className="trashed-todos mt-3">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : undeletedTodos === true ? (
          <Message message={"The deleted todos will appear here!"} />
        ) : (
          <DeletedTodosContainer />
        )}
      </div>
    </div>
  );
};

export default Trash;
