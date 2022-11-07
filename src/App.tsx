import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Routes/Dashboard";
import Homepage from "./Routes/Homepage";
import SignIn from "./Routes/SignIn";
import SignUp from "./Routes/SignUp";

import AuthContext from "./Contexts/AuthContext";
import TodoContext from "./Contexts/TodoContext";
import PrivateLoggedRoute from "./Utils/PrivateLoggedRoute";
import ForgottenPassword from "./Routes/ForgottenPassword";
import PrivateUnloggedRoute from "./Utils/PrivateUnloggedRoute";
import ErrorPage from "./Routes/ErrorPage";
import Todos from "./Routes/Dashboard/Todos";
import Finished from "./Routes/Dashboard/Finished";
import Archived from "./Routes/Dashboard/Archived";
import Trash from "./Routes/Dashboard/Trash";
import FilteredTodos from "./Routes/FilteredTodos";
document.body.classList.add("bg-zinc-700");

function App() {
  return (
    <AuthContext>
      <TodoContext>
        <main>
          <div className="App">
            <Routes>
              <Route element={<PrivateLoggedRoute />}>
                <Route element={<Dashboard />} path="dashboard/*">
                  <Route index element={<Todos />} />
                  <Route element={<Finished />} path="finished" />
                  <Route element={<Trash />} path="trash" />
                  <Route element={<Archived />} path="archived" />
                  <Route element={<FilteredTodos />} path="filtered/:labelId" />
                </Route>
              </Route>
              <Route element={<PrivateUnloggedRoute />}>
                <Route element={<SignIn />} path="/signin" />
              </Route>
              <Route element={<PrivateUnloggedRoute />}>
                <Route element={<SignUp />} path="/signup" />
              </Route>
              <Route element={<PrivateUnloggedRoute />}>
                <Route
                  element={<ForgottenPassword />}
                  path="/forgottenpassword"
                />
              </Route>
              <Route element={<Homepage />} path="/" />
              <Route element={<ErrorPage />} path="*" />
            </Routes>
          </div>
        </main>
      </TodoContext>
    </AuthContext>
  );
}

export default App;
