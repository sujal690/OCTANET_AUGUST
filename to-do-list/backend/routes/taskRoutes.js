// routes/taskRoutes.js

const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create a new task
router.post('/add', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ completed: false }).sort({ priority: -1, createdAt: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark task as completed
router.put('/complete/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = true;
    task.completedAt = new Date();
    await task.save();

    // Move task to history
    const completedTask = new Task(task.toObject());
    completedTask.completed = true;
    completedTask.completedAt = new Date();
    await completedTask.save();

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json(completedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task priority
router.put('/priority/:id', async (req, res) => {
  try {
    const { direction } = req.body; // direction should be "up" or "down"
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const adjustment = direction === 'up' ? 1 : -1;
    task.priority += adjustment;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get task history
router.get('/history', async (req, res) => {
  try {
    const completedTasks = await Task.find({ completed: true }).sort({ completedAt: -1 });
    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
