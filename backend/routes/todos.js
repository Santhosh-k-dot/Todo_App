const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const auth = require("../middleware/auth");
const { todoValidation, todoUpdateValidation } = require("../utils/validation");

const router = express.Router();

router.use(auth); // All routes are protected

router.get("/", getTodos);
router.post("/", todoValidation, createTodo);
router.put("/:id", todoUpdateValidation, updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
