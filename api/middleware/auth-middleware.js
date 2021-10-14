const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateBody = (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;
  if ( 
    first_name.trim() === undefined || 
    last_name.trim() === undefined || 
    username.trim() === undefined || 
    password.trim() === undefined
  ) {
    next({
      status: 400,
      message: "Please fill out all required fields"
    });
  } else if ( username.trim().length < 3 || password.trim().length < 3 ) {
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