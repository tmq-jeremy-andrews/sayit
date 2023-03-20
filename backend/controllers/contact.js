const User = require("../models/user");

const getContact = async (req, res) => {
  const { _id } = req.user;
  const { contact_id } = req.params;

  try {
    const matchingContact = await User.findById(_id, { contacts: 1 }).populate({
      path: "contacts",
      match: { _id: contact_id },
    });

    if (!matchingContact.length) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.status(200).json(matchingContact[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error " });
  }
};

const getAllContacts = async (req, res) => {
  const { _id } = req.user;

  try {
    const contacts = await User.findById(_id, { contacts: 1 }).populate(
      "contacts"
    );

    return res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const { user_id } = req.params;

  try {
    await User.findOneAndUpdate({ _id }, { $push: { contacts: user_id } });
    return res.status(200).json({ message: "Contact added" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteContact = async () => {
  const { _id } = req.user;
  const { user_id } = req.params;

  try {
    await User.findOneAndUpdate({ _id }, { $pull: { contacts: user_id } });
    return res.status(200).json({ message: "Contact removed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getContact,
  getAllContacts,
  addContact,
  deleteContact,
};
