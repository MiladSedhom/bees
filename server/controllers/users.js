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
    todos: user.todos,
  });
};

const createTodo = async (req, res) => {
  const userId = req.body.id;
  const todos = req.body.todos.map((element) => {
    element.dateCreated = new Date().toLocaleString();
    return element;
  });
  const user = await User.findOne({ _id: userId });
  user.todos.push(...todos);
  user.save();
  console.log(user.todos);
  res.json(user.todos);
};

const updateTodos = async (req, res) => {
  const userId = req.body.id;
  const updatedTodos = req.body.todos;
  const user = await User.findOne({ _id: userId });
  updatedTodos.forEach((updatedTodo) => {
    const todo = user.todos.id(updatedTodo._id);
    for (key in updatedTodo) {
      todo[key] = updatedTodo[key];
    }
  });
  user.save();
  res.json(user.Todos);
};

const deleteTodos = async (req, res) => {
  const userId = req.body.id;
  const updatedTodos = req.body.todos;
  const user = await User.findOne({ _id: userId });
  updatedTodos.forEach((updatedTodo) => {
    user.todos.id(updatedTodo._id).remove();
  });
  user.save();
  res.json(user.todos);
};

module.exports = { createUser, login, createTodo, updateTodos, deleteTodos };
