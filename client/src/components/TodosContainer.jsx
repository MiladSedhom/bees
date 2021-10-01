import { React, useRef } from "react";
import Todo from "./Todo";
import {
  updateCategoryInUiOnDrop,
  updateSubToInUiOnDrop,
  updateTodo,
} from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import axios from "axios";
import { filterArrayCategory as filterArrayCategory } from "../utils/utils";

const TodosContainer = ({
  category,
  guestTodos,
  todos,
  setTodos,
  isLoggedIn,
  userData,
  draggedItemId,
  setDraggedItemId,
}) => {
  const lastTodo = useRef();

  const addTodo = async () => {
    //changeing the state so the new task get added immeditaly without waitng the response
    await setTodos([
      ...todos,
      { name: "new task", category: category.toLowerCase() },
    ]);
    //post request //to be cleanded
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/todos",
      headers: {},
      data: {
        id: userData.id,
        todo: {
          category: category.toLowerCase(),
          name: `new task `,
        },
      },
    });
    const data = res.data;
    //adding a flag to the last created element
    data[data.length - 1].isRecentlyAdded = true;
    console.log(data[data.length - 1]);
    setTodos(data);
    //grabing the last added element
    const element = document.querySelector(".recently-added");
    element.focus();
    // select all the content in the element
    document.execCommand("selectAll", false, null);
  };
  return (
    <div
      className="todos-container"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        updateCategoryInUiOnDrop(todos, setTodos, category, draggedItemId);
        updateSubToInUiOnDrop(todos, setTodos, null, draggedItemId);
        updateTodo(
          { category: category.toLowerCase(), id: draggedItemId, subTo: null },
          userData.id
        );
      }}
    >
      <div className="title-container">
        <h1>{category}</h1>
        <motion.div
          onClick={addTodo}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </motion.div>
      </div>
      <hr />
      <ul>
        {!isLoggedIn
          ? filterArrayCategory(guestTodos, category.toLowerCase()).map(
              (element) => (
                <Todo
                  todo={element}
                  todos={todos}
                  setTodos={setTodos}
                  userData={userData}
                  id={String(element._id)}
                  key={String(element._id)}
                  draggedItemId={draggedItemId}
                  setDraggedItemId={setDraggedItemId}
                  isRecentlyAdded={element.isRecentlyAdded}
                />
              )
            )
          : filterArrayCategory(todos, category.toLowerCase()).map(
              (element) =>
                !element.subTo && (
                  <Todo
                    todo={element}
                    todos={todos}
                    setTodos={setTodos}
                    userData={userData}
                    id={String(element._id)}
                    key={String(element._id)}
                    draggedItemId={draggedItemId}
                    setDraggedItemId={setDraggedItemId}
                    isRecentlyAdded={element.isRecentlyAdded}
                  />
                )
            )}
      </ul>
    </div>
  );
};

export default TodosContainer;
