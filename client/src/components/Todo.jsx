import React from "react";
import { updateTodo, updateNameInTodos } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import axios from "axios";

const Todo = ({
  todo,
  todos,
  setTodos,
  userData,
  id,
  draggedItemId,
  setDraggedItemId,
  isRecentlyAdded,
}) => {
  const blurElement = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      document.activeElement.blur();
    }
  };

  const deleteTodo = async () => {
    setTodos(todos.filter((element) => element._id != id));
    const res = await axios({
      method: "delete",
      url: "http://localhost:5000/api/v1/todos",
      headers: {},
      data: {
        id: userData.id,
        todo: {
          id: id,
        },
      },
    });
  };

  return (
    <div
      className="todo"
      draggable
      onDragStart={(e) => {
        console.log("drag start");
        console.log(id);
        setDraggedItemId(id);
        console.log(draggedItemId);
      }}
    >
      <p
        className={isRecentlyAdded && "recently-added"}
        contentEditable
        onBlur={(e) => {
          updateTodo(
            {
              name: e.target.innerHTML.replaceAll("&nbsp;", ` `),
              isDone: todo.isDone,
              category: todo.category,
              id: id,
            },
            userData.id
          );
          updateNameInTodos(
            id,
            e.target.innerHTML.replaceAll("&nbsp;", ` `),
            todos,
            setTodos
          );
        }}
        onKeyDown={blurElement}
      >
        {todo.name.replaceAll(
          "<br>",
          `
        `
        )}
      </p>
      <div>
        <button className="done-btn">
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button onClick={deleteTodo} className="delete-btn">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default Todo;
