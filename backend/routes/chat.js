const express = require("express");
const requireAuth = require("../middleware/requireAuth");

// Controller functions
const {
  getChats,
  getPrivateChat,
  createPrivateChat,
  getGroupChat,
  createGroupChat,
  updateGroupChat,
  deleteGroupChat,
} = require("../controllers/chat");

const router = express.Router();

// Requires authentication
router.use(requireAuth);

router.get("/", getChats);
router.get("/private/:id", getPrivateChat);
router.post("/private", createPrivateChat);
router.get("/group/:id", getGroupChat);
router.post("/group", createGroupChat);
router.patch("/group/:id", updateGroupChat);
router.delete("/group/:id", deleteGroupChat);

module.exports = router;
