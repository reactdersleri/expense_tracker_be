const jwt = require("jsonwebtoken");

const secrets = require("../secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = secrets.JWT_SECRET;

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ errorMessage: "Invalid token" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Token is missing" });
  }
};
