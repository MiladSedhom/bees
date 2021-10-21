const mongoose = require("mongoose");
const { todoSchema } = require("./Todo");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "name can't have more than 20 chatacters"],
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date },
  todos: [todoSchema],
  categories: [String],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
