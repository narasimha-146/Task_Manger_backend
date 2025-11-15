// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markAsDone,
  getNotifications
} = require("../controllers/taskController");


router.get("/tasks", getTasks);            // List tasks + filters
router.post("/tasks", createTask);         // Create
router.get("/tasks/:id", getTaskById);     // Get single task
router.put("/tasks/:id", updateTask);      // Edit
router.delete("/tasks/:id", deleteTask);   // Delete
router.patch("/tasks/:id/done", markAsDone); // Mark Completed


router.get("/notifications", getNotifications);

module.exports = router;
