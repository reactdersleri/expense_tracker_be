const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../data/models/userModel");
const generateToken = require("../utils/generateToken");

router.post("/register", async (req, res, next) => {
  const userData = req.body;
  // const rounds = Number(process.env.HASH_ROUNDS) || 12;
  const rounds = "12";
  console.log("process.env.HASH_ROUNDS", process.env.HASH_ROUNDS);

  if (!userData.username || !userData.password || !userData.email) {
    return next([400, "Username and email are required."]);
  }

  if (userData.password && userData.password.length < 6) {
    return next([400, "Password must be at least 6 characters."]);
  }

  userData.password = bcrypt.hashSync(userData.password, rounds);

  try {
    const uExists = await User.findByUsername(userData.username);
    if (uExists) return next([400, "Username is used by someone else"]);
    const eExists = await User.findByEmail(userData.email);
    if (eExists) return next([400, "Email is used by someone else"]);
    const added = await User.addUser(userData);
    res.status(201).json(added);
  } catch {
    next([500, "User could not be registered"]);
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
      res.status(200).json({ message: `Login successful!`, token });
    } else {
      next([401, "Wrong password!"]);
    }
  } catch {
    next([500, "Login failed!"]);
  }
});

module.exports = router;
