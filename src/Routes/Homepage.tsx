import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

function Homepage({}: Props) {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <h2 className="text-5xl font-bold text-neutral-900 mb-5">Homepage</h2>
      <div className="btn-cont w-1/4 mx-auto my-0 flex flex-col gap-2 items-center justify-center">
        <button onClick={() => navigate("/signin")}>SignIn</button>
        <button onClick={() => navigate("/signup")}>SignUp</button>
      </div>
    </div>
  );
}

export default Homepage;
