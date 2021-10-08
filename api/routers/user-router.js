const router = require("express").Router();
const User = require("../models/user-model");
const tokenBuilder = require("../utils/token-builder");
const bcrypt = require("bcryptjs");
const { validateBody, validateUsername, validatePassword, isUsernameTaken } = require("../middleware/auth-middleware");

// Existing user login
// eslint-disable-next-line no-unused-vars
router.post("/login", validateBody, validateUsername, validatePassword, (req, res, next) => { 
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

router.get("/", (req, res, next) => {
  const filter = { user_id: 1 };
  User.findUserBy(filter)
    .then(currentUser => {
      res.status(200).json({currentUser});
    })
    .catch(err => console.log("error: ", err));
});

module.exports = router;
