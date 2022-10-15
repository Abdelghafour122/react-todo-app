import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";
import { useTodoContext } from "../Contexts/TodoContext";

import { BsArrowRight } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
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
            <button className="big-button" onClick={() => navigate("/signin")}>
              Get Started
              <BsArrowRight size={"1.3rem"} />
            </button>
          </>
        ) : (
          <button className="big-button" onClick={() => navigate("/dashboard")}>
            Go to dashboard
            <AiFillHome size={"1.3rem"} />
          </button>
        )}
      </div>
      <Attribution />
    </div>
  );
}

export default Homepage;
