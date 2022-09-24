import React, { useState, useEffect } from "react";
import Message from "./Todos/Message";
import { useTodoContext } from "../../Contexts/TodoContext";
import ArchivedTodosContainer from "./Todos/Containers/ArchivedTodosContainer";

type Props = {};

const Archived = (props: Props) => {
  const { todoList } = useTodoContext();
  const [loading, setLoading] = useState(true);
  const [unArchivedTodos, setUnArchivedTodos] = useState<boolean>();

  useEffect(() => {
    const checkForUnArchivedTodos = () => {
      return todoList.every((todo) => todo.archived === false);
    };
    setUnArchivedTodos(() => checkForUnArchivedTodos());
  }, [todoList]);

  useEffect(() => {
    unArchivedTodos === undefined ? setLoading(true) : setLoading(false);
  }, [unArchivedTodos]);

  return (
    <div className="archived-todos mt-3">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : unArchivedTodos === true ? (
          <Message message={"The archived todos will appear here!"} />
        ) : (
          <ArchivedTodosContainer />
        )}
      </div>
    </div>
  );
};

export default Archived;
