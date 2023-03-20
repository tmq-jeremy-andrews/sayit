const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PrivateMessageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "PrivateChat",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    received: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PrivateMessage", PrivateMessageSchema);
