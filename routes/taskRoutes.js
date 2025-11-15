// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");


const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markAsDone,
  getNotifications
} = require("../controllers/taskController");


router.get("/tasks", auth, getTasks);
router.post("/tasks", auth, createTask);
router.get("/tasks/:id", auth, getTaskById);
router.put("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);
router.patch("/tasks/:id/done", auth, markAsDone);
router.get("/notifications", auth, getNotifications);

module.exports = router;
