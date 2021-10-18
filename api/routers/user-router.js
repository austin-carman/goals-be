const router = require("express").Router();
const User = require("../models/user-model");
const tokenBuilder = require("../utils/token-builder");
const bcrypt = require("bcryptjs");
const { 
  validateBody,
  validateUsername,
  validatePassword,
  isUsernameTaken 
} = require("../middleware/auth-middleware");

// Existing user login
router.post("/login", validateUsername, validatePassword, (req, res, next) => { // eslint-disable-line no-unused-vars
  const token = tokenBuilder(req.user);
  res.status(200).json({
    message: `Welcome back ${req.user.first_name}!`,
    username: req.user.username,
    userId: req.user.user_id,
    token
  });
});

// New user registration
router.post("/register", validateBody, isUsernameTaken, (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  User.createUser({ first_name, last_name, username, password: hash })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

module.exports = router;
