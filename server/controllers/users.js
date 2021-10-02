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
  const formData = req.body;
  formData.todo.dateCreated = new Date().toLocaleString();
  const user = await User.findOne({ _id: formData.id });
  const TodosArray = [...user.todos, formData.todo];
  await User.updateOne({ _id: formData.id }, { todos: TodosArray });
  const newUser = await User.findOne({ _id: formData.id });
  res.json(newUser.todos);
};

const updateTodo = async (req, res) => {
  const formData = req.body;
  const user = await User.findOne({ _id: formData.id });
  const newTodosArray = user.todos;
  const index = user.todos.findIndex((element) => {
    return element._id.toString() == formData.todo.id;
  });
  const positiveIndex = (newTodosArray.length + index) % newTodosArray.length;
  //for somereason things break when I pass in a negative index
  if (formData.todo.name !== undefined) {
    newTodosArray[positiveIndex].name = formData.todo.name;
  }
  if (formData.todo.isDone !== undefined) {
    newTodosArray[positiveIndex].isDone = formData.todo.isDone;
  }
  if (formData.todo.category !== undefined) {
    newTodosArray[positiveIndex].category = formData.todo.category;
  }
  if (formData.todo.index !== undefined) {
    newTodosArray[positiveIndex].index = formData.todo.index;
  }
  if (formData.todo.subTo !== undefined) {
    newTodosArray[positiveIndex].subTo = formData.todo.subTo;
  }
  await User.updateOne({ _id: formData.id }, { todos: newTodosArray });
  res.json(newTodosArray);
};

const deleteTodo = async (req, res) => {
  const formData = req.body;
  const user = await User.findOne({ _id: formData.id });
  const todosArray = user.todos;
  const index = todosArray.indexOf(
    todosArray.find((element) => {
      return element._id.toString() == formData.todo.id;
    })
  );
  const positiveIndex = (todosArray.length + index) % todosArray.length;
  todosArray.splice(positiveIndex, 1);
  await User.updateOne({ _id: formData.id }, { todos: todosArray });
  res.json(todosArray);
};

module.exports = { createUser, login, createTodo, updateTodo, deleteTodo };
