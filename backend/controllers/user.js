const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    return res.status(200).json({ email, token, message: "Login successful" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { email, password, password_confirm, phone, name } = req.body;

  if (password !== password_confirm) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const user = await User.signup(email, password, phone, name);
    const token = createToken(user._id);
    return res
      .status(200)
      .json({ email, token, message: "Successfully registered" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
