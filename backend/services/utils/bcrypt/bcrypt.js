const bcrypt = require("bcryptjs");

const comparePassword = async (inputPassword, storedPassword) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

module.exports = { comparePassword };
