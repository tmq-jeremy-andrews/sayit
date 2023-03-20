const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupMessageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "GroupChat",
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
    read_by: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        time: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupMessage", GroupMessageSchema);
