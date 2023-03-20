const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const privateMessageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "PrivateChat",
    },
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    read_by: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
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

module.exports = mongoose.model("PrivateMessage", privateMessageSchema);
