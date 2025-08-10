import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function TodoForm({ onAdded }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      setTitle('');
      onAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex gap-2 mb-4 p-3 bg-light rounded shadow-sm"
    >
      <input
        type="text"
        className="form-control"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary d-flex align-items-center">
        <FaPlus className="me-2" /> Add
      </button>
    </form>
  );
}

export default TodoForm;
