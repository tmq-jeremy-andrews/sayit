const mongoose = require("mongoose");
const convoTypes = require("../lib/conversationTypes");

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  conversation_type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Conversation", conversationSchema);
