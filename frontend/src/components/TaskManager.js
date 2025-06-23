// src/components/TaskManager.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const fetchTasks = () => {
    axios.get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!input) return;
    axios.post("http://localhost:5000/tasks", { title: input })
      .then(() => {
        setInput("");
        fetchTasks();
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(fetchTasks);
  };

  const completeTask = (id) => {
    axios.patch(`http://localhost:5000/tasks/${id}`).then(fetchTasks);
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter task" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "✅" : "❌"}
            <button onClick={() => completeTask(task.id)}>Complete</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
