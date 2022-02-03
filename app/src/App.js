import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TasksOverview from "./TasksOverview";
import TaskSubmit from "./TaskSubmit";
import Login from "./Login";
import useToken from "./customHooks/useToken";
import useLoggedUser from "./customHooks/useLoggedUser";
import Info from "./Info";

function App() {
  const { token, setToken } = useToken();
  const { user, setUser } = useLoggedUser();
  if (!token) {
    return <Login setToken={setToken} setUser={setUser} />;
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/info" element={<Info />} />
        <Route path="/:id" element={<TaskSubmit token={token} user={user} />} />
        <Route path="/" element={<TasksOverview />} />
      </Routes>
    </div>
  );
}

export default App;
