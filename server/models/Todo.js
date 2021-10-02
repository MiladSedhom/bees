const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: { type: String, default: "new task", required: true },
  isDone: { type: Boolean, default: false },
  dateCreated: { type: Date, required: true },
  category: { type: String, default: "daily", required: true },
  subTo: { type: String },
  index: { type: Number },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = { todoSchema, Todo };
