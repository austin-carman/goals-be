const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Routers
const userRouter = require("./routers/user-router");
const goalsRouter = require("./routers/goals-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// Routes
server.use("/api/user", userRouter);
server.use("/api/goals", goalsRouter);

server.get("/", (req, res) => {
  res.status(200).json("api up");
});

server.get("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

// Error Handler
server.use((err, req, res) => {
  res.json({
    status: 500,
    message: err.message,
    error: err.stack,
  });
});

module.exports = server;
