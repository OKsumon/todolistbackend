const express = require("express");
const AuthRoute = require("./routes/auth.js"); // Auth Router
const TodoRoute = require("./routes/todo.js"); // Todo Router
const bodyParser = require("body-parser"); // Body-Parser
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
dotenv.config();

// ✅ Enable CORS for frontend requests
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON requests

// Auth Router
app.use("/api/user", AuthRoute);

// Todo Router
app.use("/api/todos", TodoRoute);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Express Server is running successfully!");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});

// ✅ Instead of app.listen(), export the app for Vercel
module.exports = app;
