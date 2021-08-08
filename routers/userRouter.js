const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../data/models/userModel");
const authenticator = require("../middleware/authenticator");
const generateToken = require("../utils/generateToken");

router.post("/is_logged_in", authenticator, async (req, res) => {
  const userId = req.decodedToken.id;
  const user = await User.findById(userId);
  user.message = "Login Successful!";
  delete user.password;
  delete user.id;
  user.token = req.token;
  res.status(200).json(user);
});

router.post("/register", async (req, res, next) => {
  const userData = req.body;
  const rounds = Number(process.env.HASH_ROUNDS) || 12;

  if (!userData.username || !userData.password || !userData.email) {
    return next([400, "Username and email are required."]);
  }

  if (userData.password && userData.password.length < 6) {
    return next([400, "Password must be at least 6 characters."]);
  }

  try {
    const uExists = await User.findByUsername(userData.username);
    if (uExists) return next([400, "Username is used by someone else"]);

    const eExists = await User.findByEmail(userData.email);
    if (eExists) return next([400, "Email is used by someone else"]);

    userData.password = bcrypt.hashSync(userData.password, rounds);

    await User.addUser(userData);

    res.status(201).json({ message: "User registration is successful." });
  } catch {
    next([500, "User could not be registered."]);
  }
});

router.post("/login", async (req, res, next) => {
  const userData = req.body;
  const { username, password } = userData;

  if (password.length < 6)
    return next([400, "Password must be at least 6 characters."]);

  try {
    const user = await User.findByUsername(username);
    if (!user) return next([400, "User does not exist"]);
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      const { username, email, full_name } = user;
      res.status(200).json({
        message: `Login successful!`,
        username,
        email,
        full_name,
        token,
      });
    } else {
      next([401, "Wrong password!"]);
    }
  } catch {
    next([500, "Login failed!"]);
  }
});

module.exports = router;
