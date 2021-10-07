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
  // console.log(Todos);
  const user = await User.findOne({ _id: userId });
  const TodosArray = user.todos.concat(todos);
  await User.updateOne({ _id: userId }, { todos: TodosArray });
  const newUser = await User.findOne({ _id: userId });
  res.json(newUser.todos);
};

const updateTodos = async (req, res) => {
  const userId = req.body.id;
  const updatedTodos = req.body.todos;
  const user = await User.findOne({ _id: userId });
  const newTodos = user.todos;
  newTodos.map((element) => {
    updatedTodos.forEach((updatedTodo) => {
      if (element._id == updatedTodo._id) {
        if (updatedTodo.name !== undefined) {
          element.name = updatedTodo.name;
        }
        if (updatedTodo.isDone !== undefined) {
          element.isDone = updatedTodo.isDone;
        }
        if (updatedTodo.category !== undefined) {
          element.category = updatedTodo.category;
        }
        if (updatedTodo.index !== undefined) {
          element.index = updatedTodo.index;
        }
        if (updatedTodo.subTo !== undefined) {
          element.subTo = updatedTodo.subTo;
        }
      }
      return element;
    });
  });
  await User.updateOne({ _id: userId }, { todos: newTodos });
  res.json(newTodos);
};

const deleteTodos = async (req, res) => {
  const userId = req.body.id;
  const updatedTodos = req.body.todos;
  const idsArray = updatedTodos.map((element) => element._id);
  const user = await User.findOne({ _id: userId });
  let newTodos = user.todos;
  newTodos = newTodos.filter((element) => {
    return !idsArray.includes(String(element._id));
  });
  await User.updateOne({ _id: userId }, { todos: newTodos });
  res.json(newTodos);
};

module.exports = { createUser, login, createTodo, updateTodos, deleteTodos };
