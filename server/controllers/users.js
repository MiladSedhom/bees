const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const formData = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(formData.password, salt);
  formData.password = hashedPassword;
  const isEmailThere = await User.findOne({ email: formData.email });
  if (isEmailThere) return res.status(201).send("email already exist");
  formData.dateCreated = new Date().toLocaleString();
  await User.create(formData);
  res.status(200).json({ name: formData.name });
};

const login = async (req, res) => {
  const formData = req.body;
  const user = await User.findOne({ email: formData.email });
  if (!user) {
    return res.status(201).json({ message: "wrong email bitch!" });
  }
  const isPasswordValid = await bcrypt.compare(
    formData.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(201).json({ message: "wrong password bitch!" });
  }
  res.status(200).json({
    id: user._id,
    email: user.email,
    name: user.name,
    lists: user.lists,
    categories: user.categories,
    todos: user.todos,
  });
};

module.exports = {
  createUser,
  login,
};
