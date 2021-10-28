const User = require("../models/User");

const createList = async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });
  user.lists.push(req.body.list);
  user.save();
  res.json(user.lists);
};
const updateList = async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });
  user.lists.id(req.body.listId).name = req.body.listName;
  user.save();
  res.json(user.lists);
};
const deleteList = async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });
  user.lists.id(req.body.id).remove();
  user.save();
  res.json(user.lists);
};

module.exports = {
  createList,
  updateList,
  deleteList,
};
