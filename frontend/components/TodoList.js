import TodoItem from './TodoItem';

export default function TodoList({ todos, onEdit, onDelete, onToggleStatus }) {
  if (todos.length === 0) {
    return (
      <div className="card">
        <p style={{ textAlign: 'center', color: '#666' }}>
          No todos found. Create your first todo!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '16px' }}>Your TODOs ({todos.length})</h3>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}