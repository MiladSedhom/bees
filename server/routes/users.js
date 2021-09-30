const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  login,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/users");

usersRouter.route("/users").post(createUser);
usersRouter.route("/users/login").post(login);
usersRouter
  .route("/todos")
  .post(createTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

module.exports = usersRouter;
