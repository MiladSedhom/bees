const User = require("../models/User");

const createCategory = async (req, res) => {
  const cat = req.body.cat;
  const user = await User.findOne({ _id: req.body.id });
  user.categories.push(cat);
  user.save();
  res.json(user.categories);
};

const updateCategory = async (req, res) => {
  const updatedCat = req.body.updatedCat;
  const user = await User.findOne({ _id: req.body.id });
  const cat = user.categories.id(req.body.catId);
  for (key in updatedCat) {
    cat[key] = updatedCat[key];
  }
  user.save();
  res.json(user.categories);
};

const deleteCategory = async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });
  user.categories.id(req.body.catId).remove();
  user.save();
  res.json(user.categories);
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};
