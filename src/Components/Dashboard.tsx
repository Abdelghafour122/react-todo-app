import React from "react";
import { useAuthentication } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {};

function Dashboard({}: Props) {
  const { currentUser, userSignOut } = useAuthentication();
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <h2 className="text-5xl font-bold text-neutral-900 mb-5">Dashboard</h2>
      <p>{`Welcome ${currentUser?.email}`}</p>
      <button
        className="px-3 py-1 bg-stone-700 text-stone-200"
        onClick={async () => {
          await userSignOut();
          navigate("/");
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default Dashboard;
