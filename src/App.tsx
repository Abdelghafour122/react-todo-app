import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Homepage from "./Components/Homepage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

import AuthContext from "./Contexts/AuthContext";
import PrivateRoute from "./Utils/PrivateRoute";
document.body.classList.add("bg-zinc-700");

function App() {
  return (
    <AuthContext>
      <div className="App">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
          <Route element={<Homepage />} path="/" />
          <Route element={<SignIn />} path="/signin" />
          <Route element={<SignUp />} path="/signup" />
        </Routes>
      </div>
    </AuthContext>
  );
}

export default App;
