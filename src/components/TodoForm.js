import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAddTodo?.(value);
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} aria-label="Add todo form">
      <input
        className="input"
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Todo text"
      />
      <button className="btn btn-success" type="submit" aria-label="Add todo">Add</button>
    </form>
  );
}

export default TodoForm;
