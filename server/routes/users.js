const express = require("express");
const usersRouter = express.Router();
const { createUser, login } = require("../controllers/users");
const {
  createTodo,
  updateTodos,
  deleteTodos,
} = require("../controllers/todos");
const {
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const { createList, updateList, deleteList } = require("../controllers/lists");

usersRouter.route("/users").post(createUser);
usersRouter.route("/users/login").post(login);
usersRouter
  .route("/todos")
  .post(createTodo)
  .patch(updateTodos)
  .delete(deleteTodos);
usersRouter
  .route("/categories")
  .post(createCategory)
  .patch(updateCategory)
  .delete(deleteCategory);
usersRouter
  .route("/lists")
  .post(createList)
  .patch(updateList)
  .delete(deleteList);
module.exports = usersRouter;
