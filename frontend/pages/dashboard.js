import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { todoAPI } from "../lib/auth";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sortBy: "createdAt", // ✅ Sequelize-compatible
    sortOrder: "DESC",
  });

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const fetchTodos = async () => {
    try {
      const data = await todoAPI.getTodos(filters);
      setTodos(data);
    } catch (error) {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todoData) => {
    try {
      await todoAPI.createTodo(todoData);
      toast.success("TODO created successfully!");
      setShowForm(false);
      fetchTodos();
    } catch (error) {
      toast.error("Failed to create todo");
    }
  };

  const handleUpdateTodo = async (todoData) => {
    try {
      await todoAPI.updateTodo(editingTodo.id, todoData);
      toast.success("TODO updated successfully!");
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await todoAPI.deleteTodo(id);
        toast.success("TODO deleted successfully!");
        fetchTodos();
      } catch (error) {
        toast.error("Failed to delete todo");
      }
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    try {
      await todoAPI.updateTodo(id, { status: newStatus });
      toast.success(`TODO marked as ${newStatus.toLowerCase()}!`);
      fetchTodos();
    } catch (error) {
      toast.error("Failed to update todo status");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  if (loading) {
    return (
      <Layout requireAuth>
        <div className="container">
          <div className="card">
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="container">
        <Toaster />
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Dashboard</h2>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingTodo(null);
              }}
            >
              {showForm ? "Close Form" : "Add TODO"}
            </button>
          </div>

          {/* Filters */}
          <div style={{ margin: "16px 0" }}>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search todos..."
              style={{ marginRight: "8px" }}
            />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              style={{ marginRight: "8px" }}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              style={{ marginRight: "8px" }}
            >
              <option value="createdAt">Created Date</option>
              <option value="due_date">Due Date</option>
              <option value="title">Title</option>
            </select>
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleFilterChange}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>

          {/* Form */}
          {showForm && (
            <TodoForm
              onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
              initialData={editingTodo}
              onCancel={handleCancelEdit}
            />
          )}

          {/* Todo List */}
          <TodoList
            todos={todos}
            onEdit={handleEdit}
            onDelete={handleDeleteTodo}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
    </Layout>
  );
}
