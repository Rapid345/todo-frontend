import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// Use your live backend URL here
const API_BASE = "https://todo-backend-2-zcgr.onrender.com";

// Configure axios to prepend the base URL automatically
axios.defaults.baseURL = API_BASE;

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("/todos"); // Gets from https://todo-backend-2-zcgr.onrender.com/todos
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  // Update the todo list on first render
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="todo-card">
        <h1 className="text-center mb-4 text-primary">🌟 My To-Do List 🌟</h1>
        <TodoForm onAdded={fetchTodos} />
        <TodoList todos={todos} onUpdated={fetchTodos} />
      </div>
    </div>
  );
}

export default App;
