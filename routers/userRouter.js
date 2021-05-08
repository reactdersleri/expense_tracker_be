const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secrets = require("../secrets");

const User = require("../data/models/userModel");

router.post("/register", async (req, res) => {
  const userData = req.body;
  const rounds = process.env.HASH_ROUNDS || 12;

  if (userData.password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  if (!userData.username || !userData.email) {
    res.status(400).json({ error: "Username and email are required." });
  }

  const hashedPassword = bcrypt.hashSync(userData.password, rounds);

  userData.password = hashedPassword;
  try {
    const added = await User.addUser(userData);
    res.status(201).json({
      id: added.id,
      username: added.username,
      email: added.email,
    });
  } catch {
    res.status(500).json({ error: "User could not be registered" });
  }
});

router.post("/login", async (req, res) => {
  const userData = req.body;
  const { username, password } = userData;

  console.log(req.decodedToken);

  try {
    const user = await User.findByUsername(username);
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `Login successful!`, token });
    } else {
      res.status(401).json({ errorMessage: "Wrong password!" });
    }
  } catch {
    res.status(500).json({ error: "Login failed!" });
  }
});

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const secret = secrets.JWT_SECRET;

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
