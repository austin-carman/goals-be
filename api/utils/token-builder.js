const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


module.exports = function (user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(
    payload,
    JWT_SECRET,
    options
  );
};
