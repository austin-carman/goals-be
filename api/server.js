const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Routers
const userRouter = require("./routers/user-router");
const goalsRouter = require("./routers/goals-router");

const server = express();
server.use(express.json());
server.use(helmet());
// server.use(cors());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://goals-fe.vercel.app",
  ],
  "Access-Control-Allow-Origin": [
    "http://localhost:3000",
    "https://goals-fe.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
server.use(cors(corsOptions));

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
