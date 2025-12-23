require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manger-frontend-liard.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  })
);

app.use(express.json());
app.use(logger);

// ✅ TEST ROUTE (MUST BE BEFORE notFound)
app.get("/test", (req, res) => {
  res.send("Server is working");
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api', taskRoutes);

// ❌ Error handling MUST BE LAST
app.use(notFound);
app.use(errorHandler);

// DB + Server Start
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
  });
