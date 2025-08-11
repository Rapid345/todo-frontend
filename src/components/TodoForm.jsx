import React, { useState } from "react";
import axios from "axios";

function TodoForm({ onAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevent empty todos

    try {
      await axios.post("/todos", { title });
      setTitle(""); // Clear input
      onAdded(); // Refresh the list
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
