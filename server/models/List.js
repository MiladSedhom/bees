const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: { type: String, default: "new list", required: true },
  dateCreated: { type: Date },
});

const List = mongoose.model("List", listSchema);
module.exports = { listSchema, List };
