const { body } = require('express-validator');

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const todoValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('due_date').isISO8601().withMessage('Please provide a valid date'),
];

const todoUpdateValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('due_date').optional().isISO8601().withMessage('Please provide a valid date'),
  body('status').optional().isIn(['Pending', 'Completed']).withMessage('Status must be Pending or Completed'),
];

module.exports = {
  registerValidation,
  loginValidation,
  todoValidation,
  todoUpdateValidation,
};