const express = require("express");
const requireAuth = require("../middleware/requireAuth");

// Controller functions
const {
  getContact,
  getAllContacts,
  addContact,
  deleteContact,
} = require("../controllers/contact");

const router = express.Router();

// Requires authentication
router.use(requireAuth);

router.get("/", getAllContacts);
router.get("/:contact_id", getContact);
router.post("/:user_id", addContact);
router.delete("/:user_id", deleteContact);

module.exports = router;
