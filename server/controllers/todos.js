const User = require("../models/User");

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

module.exports = { createTodo, updateTodos, deleteTodos };
