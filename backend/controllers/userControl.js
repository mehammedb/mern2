const User = require("../models/userModel");
const validator = require("validator");

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
    res.status(200).json(user);
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
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { userLogin, userSignup };
