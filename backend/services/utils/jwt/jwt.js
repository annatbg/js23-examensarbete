const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (username) => {
  return jwt.sign({ username }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken };
