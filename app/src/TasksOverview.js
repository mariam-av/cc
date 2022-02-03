import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TasksOverview = (props) => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/tasks");
      const result = await response.json();
      setTasks(result.data);
    })();
  }, []);

  const isLoading = tasks === null;
  return isLoading ? (
    "Loading…"
  ) : (
    <>
      <h1>
        Tasks<Link to={`/info`}>?</Link>
      </h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={`/${task.id}`}>{task.instructions}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksOverview;
