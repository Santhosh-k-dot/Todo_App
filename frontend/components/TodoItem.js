export default function TodoItem({ todo, onEdit, onDelete, onToggleStatus }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && todo.status === 'Pending';
  };

  return (
    <div className={`todo-item ${todo.status === 'Completed' ? 'todo-completed' : ''}`}>
      <div>
        <h4 style={{ 
          color: isOverdue(todo.due_date) ? '#dc3545' : 'inherit',
          marginBottom: '8px' 
        }}>
          {todo.title}
        </h4>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Due: {formatDate(todo.due_date)}
          {isOverdue(todo.due_date) && <span style={{ color: '#dc3545' }}> (Overdue)</span>}
        </p>
        <p style={{ color: '#666', fontSize: '12px' }}>
          Status: <span style={{ 
            color: todo.status === 'Completed' ? '#28a745' : '#ffc107',
            fontWeight: 'bold' 
          }}>
            {todo.status}
          </span>
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          className={`btn ${todo.status === 'Pending' ? 'btn-success' : 'btn-secondary'}`}
          onClick={() => onToggleStatus(todo.id, todo.status === 'Pending' ? 'Completed' : 'Pending')}
          style={{ fontSize: '12px', padding: '6px 12px' }}
        >
          {todo.status === 'Pending' ? 'Mark Complete' : 'Mark Pending'}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onEdit(todo)}
          style={{ fontSize: '12px', padding: '6px 12px' }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(todo.id)}
          style={{ fontSize: '12px', padding: '6px 12px' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}