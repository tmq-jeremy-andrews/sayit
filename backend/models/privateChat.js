const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const privateChatSchema = new Schema({
  user_1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_2: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("PrivateChat", privateChatSchema);
