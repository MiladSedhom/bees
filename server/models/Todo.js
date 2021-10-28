const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: { type: String, default: "new task", required: true },
  isDone: { type: Boolean, default: false },
  dateCreated: { type: Date },
  categoryId: { type: String },
  subTo: { type: String },
  index: { type: String },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = { todoSchema, Todo };
