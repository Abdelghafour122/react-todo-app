import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTodoContext } from "../Contexts/TodoContext";
import Navbar from "./Dashboard/Navbar";

type Props = {};

function Dashboard(props: Props) {
  const { fetchTodoItems } = useTodoContext();

  useEffect(() => {
    fetchTodoItems();
  }, [fetchTodoItems]);

  return (
    <div className="dashboard h-full w-full flex items-start justify-start">
      <Navbar />
      <div className="dashboard-body flex-1 h-full pt-2 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
