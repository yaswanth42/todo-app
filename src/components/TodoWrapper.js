import React, { useEffect, useMemo, useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import EditToForm from './EditToForm';

const STORAGE_KEY = 'todos-v1';

const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState('all'); // all | active | completed
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); } catch {}
  }, [todos]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default: return todos;
    }
  }, [todos, filter]);

  const addTodo = (text) => {
    const newTodo = { id: crypto.randomUUID(), text, completed: false };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (todo) => setEditingId(todo.id);
  const saveEdit = (id, newText) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t));
    setEditingId(null);
  };

  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.completed));

  return (
    <div>
      <header className="todo-header">
        <div>
          <h1>Todo List</h1>
          <p className="todo-subtitle">Stay organized and get things done</p>
        </div>
        <span className="pill" title={`Total: ${stats.total}`}>{stats.active} active</span>
      </header>

      <TodoForm onAddTodo={addTodo} />

      <div className="row" style={{ justifyContent: 'space-between', marginTop: '.75rem' }}>
        <div className="row" aria-label="Filter todos">
          <button aria-pressed={filter === 'all'} className={`btn btn-ghost${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button aria-pressed={filter === 'active'} className={`btn btn-ghost${filter === 'active' ? ' active' : ''}`} onClick={() => setFilter('active')}>Active</button>
          <button aria-pressed={filter === 'completed'} className={`btn btn-ghost${filter === 'completed' ? ' active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <button className="btn btn-warning" onClick={clearCompleted} disabled={stats.completed === 0}>Clear completed</button>
      </div>

  <ul className="todo-list" aria-live="polite" aria-relevant="additions removals">
        {visibleTodos.length === 0 && (
          <li className="todo-item" aria-hidden>
            <span className="todo-text" style={{ color: 'var(--muted)' }}>No todos to show</span>
          </li>
        )}
        {visibleTodos.map((t) => (
          <React.Fragment key={t.id}>
            {editingId === t.id ? (
              <li className="todo-item">
                <EditToForm
                  initialText={t.text}
                  onSave={(newText) => saveEdit(t.id, newText)}
                  onCancel={() => setEditingId(null)}
                />
              </li>
            ) : (
              <TodoItem
                todo={t}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEditRequest={startEdit}
              />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default TodoWrapper;
