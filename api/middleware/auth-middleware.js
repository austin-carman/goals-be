const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateBody = (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;
  if ( 
    first_name === undefined ||
    first_name === "" || 
    last_name === undefined || 
    last_name === "" ||
    username === undefined || 
    password === undefined
  ) {
    next({
      status: 400,
      message: "Please fill out all required fields"
    });
  } else if ( username.length < 3 || password.length < 3 ) {
    next({
      status: 400,
      message: "Username and password must be at least 3 characters in length."
    });
  } else {
    next();
  }
};

const validateUsername = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findUserBy({username});
    if (user === undefined) {
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
  if (user === undefined) {
    next();
  } else {
    next({
      status: 403,
      message: `${username}, already taken. Please choose another username.`
    });
  }
};

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Valid token required" });
      } else {
        req.decodedJwt = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Valid token required" });
  }
}; 

module.exports = {
  validateBody,
  validateUsername,
  validatePassword,
  isUsernameTaken,
  restricted
};