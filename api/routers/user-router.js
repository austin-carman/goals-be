const router = require("express").Router();
const User = require("../models/user-model");
const tokenBuilder = require("../utils/token-builder");
const { validateBody, validateUsername, validatePassword } = require("../middleware/auth-middleware");

// Endpoint for existing user login
router.post("/login", validateBody, validateUsername, validatePassword, (req, res, next) => { // eslint-disable-line no-unused-vars
  const token = tokenBuilder(req.user);
  res.status(200).json({
    message: `Welcome back ${req.user.first_name}!`,
    username: req.user.username,
    userId: req.user.user_id,
    token
  });
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
