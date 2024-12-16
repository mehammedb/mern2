const User = require("../models/userModel");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

const userSignup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: "All fields are mandatory!" });
  }

  if (!validator.isEmail(email)) {
    return res.status(401).json({ error: "Invalid email!" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(401).json({ error: "Weak password!" });
  }
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: "All fields are mandatory!" });
  }

  if (!validator.isEmail(email)) {
    return res.status(401).json({ error: "Invalid email!" });
  }
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { userLogin, userSignup };
