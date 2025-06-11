import { useState } from 'react';

export default function TodoForm({ onSubmit, initialData = null, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    due_date: initialData?.due_date ? initialData.due_date.split('T')[0] : '',
    status: initialData?.status || 'Pending',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card">
      <h3>{initialData ? 'Edit TODO' : 'Add New TODO'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />
        </div>

        {initialData && (
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update' : 'Add'} TODO
          </button>
          {onCancel && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}