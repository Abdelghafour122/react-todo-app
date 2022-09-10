import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Routes/Dashboard";
import Homepage from "./Routes/Homepage";
import SignIn from "./Routes/SignIn";
import SignUp from "./Routes/SignUp";

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
