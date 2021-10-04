const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  login,
  createTodo,
  updateTodos,
  deleteTodos,
} = require("../controllers/users");

usersRouter.route("/users").post(createUser);
usersRouter.route("/users/login").post(login);
usersRouter
  .route("/todos")
  .post(createTodo)
  .patch(updateTodos)
  .delete(deleteTodos);

module.exports = usersRouter;
