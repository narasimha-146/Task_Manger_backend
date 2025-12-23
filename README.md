# 🗂️ Task Manager Backend (MERN)

A **secure and scalable RESTful backend** for a Task Management application built using **Node.js, Express, MongoDB, and JWT authentication**.  
This backend handles **user authentication**, **task CRUD operations**, and **notifications** with proper authorization.

> 📌 Frontend is maintained in a **separate repository**.

---

## 🚀 Features

- User registration & login (JWT-based authentication)
- Protected routes using middleware
- Task CRUD operations (Create, Read, Update, Delete)
- Task status management (Pending / Completed / Overdue)
- Sorting & filtering support
- Notification API for overdue & upcoming tasks
- Centralized error handling
- Clean, scalable project structure

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Tokens)  
- bcryptjs  
- dotenv  
- CORS  

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
│
├── controllers/
│   ├── userController.js     # Auth logic
│   └── taskController.js     # Task CRUD & notifications
│
├── middleware/
│   ├── auth.js               # JWT authentication
│   ├── notFound.js           # 404 handler
│   └── errorHandler.js       # Global error handler
│
├── models/
│   ├── user.js               # User schema
│   └── tasks.js              # Task schema
│
├── routes/
│   ├── userRoutes.js         # Auth routes
│   └── taskRoutes.js         # Task routes
│
├── utils/
│   └── logger.js             # Request logger
│
├── .env                      # Environment variables
├── server.js                 # Entry point
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Getting Started

### Clone the repository
```bash
git clone https://github.com/narasimha-146/Task_Manger_backend.git
cd Task_Manger_backend
```

### Install dependencies
```bash
npm install
```

### Run the server
```bash
npm run dev
```

Server will start at:
```
http://localhost:5000
```

---

## 🔐 Authentication

All protected routes require a JWT token:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📌 API Endpoints

### Auth
- POST `/api/users/register`
- POST `/api/users/login`

### Tasks (Protected)
- GET `/api/tasks`
- GET `/api/tasks/:id`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`
- PATCH `/api/tasks/:id/done`
- GET `/api/notifications`

---

## 🧪 Sample Request

```json
{
  "title": "Finish backend APIs",
  "priority": "High",
  "status": "Pending",
  "dueDate": "2025-01-25"
}
```

---

## 🔒 Security

- Password hashing with bcrypt
- JWT-based authentication
- Environment variables for secrets
- CORS configuration

---

## 🧑‍💻 Author

**Narasimha**  
GitHub: https://github.com/narasimha-146

---

## 📌 Note

This repository contains **only backend code**.  
Frontend is maintained separately.
