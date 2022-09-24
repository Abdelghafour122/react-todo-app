import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Dashboard/Navbar";

type Props = {};

function Dashboard(props: Props) {
  return (
    <div className="dashboard h-full w-full flex items-start justify-start">
      <Navbar />
      <div className="dashboard-body flex-1 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
