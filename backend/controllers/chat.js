const { error500 } = require("../lib/controllerCommon");
const PrivateChat = require("../models/privateChat");
const PrivateMessage = require("../models/privateMessage");
const GroupChat = require("../models/groupChat");
const GroupMessage = require("../models/groupMessage");

// TODO add pagination for fetching chats
// TODO add filtering for hidden chats (deleted, spam, etc.)

const getChats = async (req, res) => {
  // Get user ID
  const { _id } = req.user;

  try {
    const privateChats = await PrivateChat.find({
      $or: [{ user_1: _id }, { user_2: _id }],
    });

    const groupChats = await GroupChat.find(
      { users: _id, active: true },
      { name: 1 }
    );

    // Fetch the latest messages for previewing
    privateChats.map(async (chat) => {
      const lastMessage = await PrivateMessage.findOne(
        { chat: chat._id },
        { content: 1, sender: 1, received: 1, read: 1, createdAt: 1 },
        { sort: { createdAt: -1 } }
      );

      chat.last_message = lastMessage;
    });

    groupChats.map(async (chat) => {
      const lastMessage = await GroupMessage.findOne(
        { chat: chat._id },
        { content: 1, sender: 1, received: 1, read_by: 1, createdAt: 1 },
        { sort: { createdAt: -1 } }
      );

      chat.last_message = lastMessage;
    });

    return res.status(200).json({ private: privateChats, group: groupChats });
  } catch (err) {
    return error500(err, res);
  }
};

const getPrivateChat = async (req, res) => {
  const { id } = req.params;

  try {
    const chat = await PrivateChat.findById(id).populate(["user_1", "user_2"]);

    if (!chat) {
      return res.status(404).json({ error: "Private chat does not exist" });
    }

    const messages = await PrivateMessage.find({ chat: id }).sort({
      createdAt: -1,
    });

    chat.messages = messages;

    return res.status(200).json(chat);
  } catch (err) {
    return error500(err, res);
  }
};

// No update for private chat as it is currently not necessary
// TODO add chat blocking, deleting, archiving

const createPrivateChat = async (req, res) => {
  const { _id } = req.user;
  const { user } = req.body;

  try {
    const chat = await PrivateChat.create({ user_1: _id, user_2: user });

    return res.status(200).json(chat);
  } catch (err) {
    return error500(err, res);
  }
};

const getGroupChat = async (req, res) => {
  const { id } = req.params;

  try {
    const chat = await GroupChat.findOne({ _id: id, active: true }).populate([
      "users",
    ]);

    if (!chat) {
      return res.status(404).json({ error: "Group chat does not exist" });
    }

    const messages = await GroupMessage.find({ chat: id })
      .sort({
        createdAt: -1,
      })
      .populate(["sender", "read_by.user"]);

    chat.messages = messages;

    return res.status(200).json(chat);
  } catch (err) {
    return error500(err, res);
  }
};

const createGroupChat = async (req, res) => {
  const { _id } = req.user;
  const { name, users } = req.body;

  try {
    const chat = await GroupChat.create({
      name,
      users,
      creator: _id,
    });

    return res.status(200).json(chat);
  } catch (err) {
    return error500(err, res);
  }
};

const updateGroupChat = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const chat = await GroupChat.findOneAndUpdate({ _id: id }, { name });

    if (!chat) {
      return res.status(404).json({ message: "Group chat does not exist" });
    }

    return res.status(200).json(chat);
  } catch (err) {
    return error500(err, res);
  }
};

const deleteGroupChat = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const chat = await GroupChat.findOne(
      { _id: id, active: true },
      { creator: 1 }
    );

    if (chat.creator !== userId) {
      return res.status(403).json({
        error: "User does not have permission to delete the group chat",
      });
    }

    chat.active = false;
    chat.save();

    return res.status(200).json({ message: "Group chat deleted" });
  } catch (err) {
    return error500(err, res);
  }
};

module.exports = {
  getChats,
  getPrivateChat,
  createPrivateChat,
  getGroupChat,
  createGroupChat,
  updateGroupChat,
  deleteGroupChat,
};
