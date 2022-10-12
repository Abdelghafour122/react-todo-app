import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";
import { useTodoContext } from "../Contexts/TodoContext";

import { BsArrowRight } from "react-icons/bs";
import Attribution from "../Components/Dashboard/Attribution";

function Homepage() {
  const { currentUser } = useAuthentication();
  const { fetchTodoItems } = useTodoContext();

  useEffect(() => {
    fetchTodoItems();
  }, [fetchTodoItems]);

  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="text flex flex-col gap-5 items-center justify-between mb-12">
        <h2 className="text-7xl font-bold text-stone-200">Dooit</h2>
        <p className="text-lg font-medium text-stone-400">
          Track your work - Stay organized
        </p>
      </div>
      <div className="btn-cont w-full mx-auto my-0 flex flex-col gap-2 items-center justify-center">
        {currentUser === null ? (
          <>
            {/* <button
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
            </button> */}
            <button
              className="flex items-center gap-1 p-2 rounded-sm text-lg font-medium text-stone-100 bg-orange-400"
              onClick={() => navigate("/signin")}
            >
              Get Started
              <BsArrowRight size={"1.3rem"} />
            </button>
          </>
        ) : (
          <button className="button" onClick={() => navigate("/dashboard")}>
            Go to dashboard
          </button>
        )}
      </div>
      <Attribution />
    </div>
  );
}

export default Homepage;
