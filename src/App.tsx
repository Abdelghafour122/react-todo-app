import React from "react";
import "./App.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

function App() {
  document.body.classList.add("bg-zinc-700");
  return (
    <div className="App">
      {/* <SignIn /> */}
      <SignUp />
    </div>
  );
}

export default App;
