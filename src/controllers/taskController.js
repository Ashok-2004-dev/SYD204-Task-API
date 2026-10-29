// src/controllers/taskController.js
// Handles validation and HTTP responses

const taskModel = require('../models/taskModel');

const taskController = {
  getAllTasks: async (req, res, next) => {
    try {
      const tasks = await taskModel.findAll();
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  },

  getTaskById: async (req, res, next) => {
    try {
      const task = await taskModel.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          error: 'Task not found'
        });
      }

      res.json(task);
    } catch (err) {
      next(err);
    }
  },

  createTask: async (req, res, next) => {
    try {
      const { title, completed = false } = req.body;

      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
          error: 'Title is required'
        });
      }

      if (typeof completed !== 'boolean') {
        return res.status(400).json({
          error: 'completed must be true or false'
        });
      }

      const newTask = await taskModel.create({
        title: title.trim(),
        completed
      });

      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const { title, completed } = req.body;

      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
          error: 'Title is required'
        });
      }

      if (typeof completed !== 'boolean') {
        return res.status(400).json({
          error: 'completed must be true or false'
        });
      }

      const updatedTask = await taskModel.update(
        req.params.id,
        {
          title: title.trim(),
          completed
        }
      );

      if (!updatedTask) {
        return res.status(404).json({
          error: 'Task not found'
        });
      }

      res.json(updatedTask);
    } catch (err) {
      next(err);
    }
  },

  patchTask: async (req, res, next) => {
    try {
      const { title, completed } = req.body;

      if (title === undefined && completed === undefined) {
        return res.status(400).json({
          error: 'Provide title or completed to update'
        });
      }

      if (
        title !== undefined &&
        (typeof title !== 'string' || title.trim() === '')
      ) {
        return res.status(400).json({
          error: 'Title cannot be empty'
        });
      }

      if (
        completed !== undefined &&
        typeof completed !== 'boolean'
      ) {
        return res.status(400).json({
          error: 'completed must be true or false'
        });
      }

      const fields = {};

      if (title !== undefined) {
        fields.title = title.trim();
      }

      if (completed !== undefined) {
        fields.completed = completed;
      }

      const updatedTask = await taskModel.partialUpdate(
        req.params.id,
        fields
      );

      if (!updatedTask) {
        return res.status(404).json({
          error: 'Task not found'
        });
      }

      res.json(updatedTask);
    } catch (err) {
      next(err);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const deleted = await taskModel.remove(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          error: 'Task not found'
        });
      }

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = taskController;