const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

module.exports = function generateToken(user) {
  const payload = {
    id: user.id,
  };

  const secret = secrets.JWT_SECRET;

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
};
