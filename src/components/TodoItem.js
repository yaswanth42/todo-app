import React from 'react';

// Contract
// props: { todo: { id, text, completed }, onToggle(id), onDelete(id), onEditRequest(todo) }
const TodoItem = ({ todo, onToggle, onDelete, onEditRequest }) => {
  return (
    <li className="todo-item" aria-label={`Todo: ${todo.text}`}>
      <input
        type="checkbox"
        className="todo-check"
        checked={!!todo.completed}
        onChange={() => onToggle?.(todo.id)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
      <div className="todo-actions">
        <button
          className="icon-btn"
          onClick={() => onEditRequest?.(todo)}
          title="Edit"
          aria-label="Edit todo"
        >✏️</button>
        <button
          className="icon-btn"
          onClick={() => onDelete?.(todo.id)}
          title="Delete"
          aria-label="Delete todo"
        >🗑️</button>
      </div>
    </li>
  );
};

export default TodoItem;
