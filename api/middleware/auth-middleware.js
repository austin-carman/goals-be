const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const validateBody = (req, res, next) => { // todo: username/password length, sanitize(e.g. white spaces)
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      status: 400,
      message: "Username and password are required"
    });
  } else {
    next();
  }
};

const validateUsername = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findUserBy({username});
    if (!user) { // is ! really the best way to check???
      res.json({
        status: 401,
        message: "Invalid username or password"
      });
    } else {
      req.user = user;
      next();
    }
  }
  catch (err) {
    next(err);
  }
};

const validatePassword = (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    next();
  } else {
    next({ 
      status: 401, 
      message: "Invalid username or password" 
    });
  }
};

const isUsernameTaken = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findUserBy({username});
  if (!user) {
    next();
  } else {
    next({
      status: 403,
      message: `Username, ${username}, already exists.`
    });
  }
};

const createNewUser = async (req, res, next) => {
  console.log("middleware reached");
  next();
};

module.exports = {
  validateBody,
  validateUsername,
  validatePassword,
  isUsernameTaken,
  createNewUser
};