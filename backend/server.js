const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

const PORT = process.env.PORT || 5000;

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log("Database synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

startServer();
