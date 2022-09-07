import React from "react";
import "./App.css";
import SignIn from "./Components/SignIn";

function App() {
  return (
    <div className="App">
      <h1 className="text-[40px] font-sans font-medium ">
        You kept mandem waiting
      </h1>
      <SignIn />
    </div>
  );
}

export default App;
