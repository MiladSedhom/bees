import { React, useRef } from "react";
import Todo from "./Todo";
import { updateTodo } from "../utils/utils";
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
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/todos",
      headers: {},
      data: {
        id: userData.id,
        todo: {
          category: category.toLowerCase(),
          name: "new task",
        },
      },
    });
    const data = res.data;
    data[data.length - 1].ref = lastTodo;
    // lastTodo.current.foucs();
    setTodos(data);
  };
  return (
    <div
      className="todos-container"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        console.log("drop in", category.toLowerCase());
        const newTodos = todos.map((element) => {
          console.log(element._id === draggedItemId);
          if (element._id === draggedItemId) {
            element.category = category.toLowerCase();
            console.log(element);
            return element;
          } else {
            return element;
          }
        });
        setTodos(newTodos);
        updateTodo({ category: category, id: draggedItemId }, userData.id);
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
                  ref={element.ref}
                />
              )
            )
          : filterArrayCategory(todos, category.toLowerCase()).map(
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
                  ref={element.ref && element.ref}
                />
              )
            )}
      </ul>
    </div>
  );
};

export default TodosContainer;
