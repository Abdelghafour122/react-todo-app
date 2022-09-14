import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Routes/Dashboard";
import Homepage from "./Routes/Homepage";
import SignIn from "./Routes/SignIn";
import SignUp from "./Routes/SignUp";

import AuthContext from "./Contexts/AuthContext";
import PrivateLoggedRoute from "./Utils/PrivateLoggedRoute";
import ForgottenPassword from "./Routes/ForgottenPassword";
import PrivateUnloggedRoute from "./Utils/PrivateUnloggedRoute";
import ErrorPage from "./Routes/ErrorPage";
document.body.classList.add("bg-zinc-700");

function App() {
  return (
    <AuthContext>
      <div className="App">
        <Routes>
          <Route element={<PrivateLoggedRoute />}>
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
          <Route element={<PrivateUnloggedRoute />}>
            <Route element={<SignIn />} path="/signin" />
          </Route>
          <Route element={<PrivateUnloggedRoute />}>
            <Route element={<SignUp />} path="/signup" />
          </Route>
          <Route element={<PrivateUnloggedRoute />}>
            <Route element={<ForgottenPassword />} path="/forgottenpassword" />
          </Route>
          <Route element={<Homepage />} path="/" />
          <Route element={<ErrorPage />} path="*" />
        </Routes>
      </div>
    </AuthContext>
  );
}

export default App;
