import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";
type Props = {};

function Homepage({}: Props) {
  const { currentUser } = useAuthentication();
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <h2 className="text-5xl font-bold text-neutral-900 mb-5">Homepage</h2>
      <div className="btn-cont w-full mx-auto my-0 flex flex-col gap-2 items-center justify-center">
        {currentUser === null ? (
          <>
            <button
              onClick={() => navigate("/signin")}
              className="bg-stone-200 font-semibold py-1 px-3 rounded-md border-2 border-slate-900 "
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-stone-200 font-semibold py-1 px-3 rounded-md border-2 border-slate-900"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/dashboard")}>
            Go to dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default Homepage;
