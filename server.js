require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] }));
app.use(express.json());
app.use(logger);

// Routes
app.use('/api', taskRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// DB + Server Start
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
