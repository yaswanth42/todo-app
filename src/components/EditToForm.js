import React, { useEffect, useRef, useState } from 'react';

// Contract
// props: { initialText, onSave(newText), onCancel() }
const EditToForm = ({ initialText = '', onSave, onCancel }) => {
  const [text, setText] = useState(initialText);
  const inputRef = useRef(null);

  useEffect(() => { setText(initialText); }, [initialText]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSave?.(value);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} aria-label="Edit todo form">
      <input
        ref={inputRef}
        className="input"
        type="text"
        placeholder="Edit task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Edit todo text"
      />
      <div className="row">
        <button className="btn btn-warning" type="submit" aria-label="Save changes">Save</button>
        <button className="btn btn-ghost" type="button" onClick={() => onCancel?.()} aria-label="Cancel">Cancel</button>
      </div>
    </form>
  );
};

export default EditToForm;
