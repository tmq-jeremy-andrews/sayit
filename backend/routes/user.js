const express = require("express");

// Controller functions
const { signupUser, loginUser } = require("../controllers/user");

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

module.exports = router;
