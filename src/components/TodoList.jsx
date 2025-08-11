import React from 'react';
import { FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

function TodoList({ todos, onUpdated }) {
  const toggleComplete = async (todo) => {
    await fetch(`https://todo-backend-2-zcgr.onrender.com/api/todos/${todo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });
    onUpdated();
  };

  const deleteTodo = async (id) => {
    await fetch(`https://todo-backend-2-zcgr.onrender.com/api/todos/${id}`, {
      method: 'DELETE',
    });
    onUpdated();
  };

  return (
    <ul className="list-group shadow-sm">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`d-flex align-items-center ${
              todo.completed ? 'text-decoration-line-through text-muted' : ''
            }`}
            style={{ cursor: 'pointer' }}
            onClick={() => toggleComplete(todo)}
          >
            {todo.completed ? (
              <FaCheckCircle className="text-success me-2" />
            ) : (
              <FaRegCircle className="text-secondary me-2" />
            )}
            {todo.title}
          </span>
          <FaTrash
            className="text-danger"
            style={{ cursor: 'pointer' }}
            onClick={() => deleteTodo(todo._id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
