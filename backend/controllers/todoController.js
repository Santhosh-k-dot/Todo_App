const { validationResult } = require("express-validator");
const { Todo } = require("../models");
const { Op } = require("sequelize");

const getTodos = async (req, res) => {
  try {
    const {
      search,
      status,
      sortBy = "created_at",
      sortOrder = "DESC",
    } = req.query;

    let where = { userId: req.user.id };

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    if (status && ["Pending", "Completed"].includes(status)) {
      where.status = status;
    }

    const todos = await Todo.findAll({
      where,
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, due_date } = req.body;

    const todo = await Todo.create({
      title,
      due_date,
      userId: req.user.id,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, due_date, status } = req.body;

    const todo = await Todo.findOne({
      where: { id, userId: req.user.id },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todo.update({ title, due_date, status });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      where: { id, userId: req.user.id },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todo.destroy();
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
