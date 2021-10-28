const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, default: "new category", required: true },
  dateCreated: { type: Date },
  ListId: { type: String },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = { categorySchema, Category };
