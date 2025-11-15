const Task = require("../models/tasks");

// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.userId,   // attach logged-in user
    });

    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

// Get Tasks (with optional status filter)
exports.getTasks = async (req, res, next) => {
  try {
    const { status } = req.query;
    let filter = { userId: req.userId }; // only this user's tasks

    if (status) filter.status = status;

    const tasks = await Task.find(filter).sort({ createdAt: -1 }).lean();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get Task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Update Task
exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete Task
exports.deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Mark as Done (status → Completed)
exports.markAsDone = async (req, res, next) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status: "Completed" },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};


// Get notifications (overdue + tasks due in next 24 hours)
exports.getNotifications = async (req, res, next) => {
  try {
    const now = new Date();
    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours ahead

    const tasks = await Task.find({
      userId: req.userId,
      status: { $ne: "Completed" },
      dueDate: { $lte: oneDayLater }, // due in next 24 hours or overdue
    })
      .sort({ dueDate: 1 })
      .lean();

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

