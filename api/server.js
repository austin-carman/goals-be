const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Routers go here

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// Routes' base URL will go here

server.get("/", (req, res) => {
  res.status(200).json("api up");
});

server.get('*', (req, res) => {
  res.status(404).json({
    message: "not found"
  });
});

// Error Handler
server.use((err, req, res, next) => {
  res.json({
    status: 500,
    message: err.message,
    error: err.stack
  });
});

module.exports = server;
