import React from "react";
import axios from "axios";

function TodoList({ todos, onUpdated }) {
  const toggleComplete = async (id, currentStatus, title) => {
    try {
      await axios.put(`/todos/${id}`, {
        completed: !currentStatus,
        title: title
      });
      onUpdated();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      onUpdated();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <ul className="list-group">
      {todos.length === 0 && (
        <li className="list-group-item text-center text-muted">
          No tasks yet. Add one above!
        </li>
      )}
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
            onClick={() => toggleComplete(todo._id, todo.completed, todo.title)}
          >
            {todo.title}
          </span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
