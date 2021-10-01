import React from "react";
import {
  updateTodo,
  updateNameInTodos,
  updateSubToInUiOnDrop,
  updateCategoryInUiOnDrop,
} from "../utils/utils";
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
  subTodos,
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
    <>
      <div
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.stopPropagation();
          if (draggedItemId != id) {
            updateCategoryInUiOnDrop(
              todos,
              setTodos,
              todo.category,
              draggedItemId
            );
            updateSubToInUiOnDrop(todos, setTodos, id, draggedItemId);
            updateTodo(
              {
                category: todo.category.toLowerCase(),
                id: draggedItemId,
                subTo: id,
              },
              userData.id
            );
          }
        }}
        className={todo.isDone ? "todo done" : "todo"}
        draggable
        onDragStart={(e) => {
          setDraggedItemId(id);
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
          <motion.button
            whileHover={{ scale: 1.2, color: "rgb(93, 255, 87)" }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.2,
            }}
            onClick={async (e) => {
              const updatedTodos = await updateTodo(
                { isDone: !todo.isDone, id: id },
                userData.id
              );
              setTodos(updatedTodos);
            }}
            className="done-btn"
          >
            <FontAwesomeIcon icon={faCheck} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.2, color: "rgb(255, 87, 87)" }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.2,
            }}
            onClick={deleteTodo}
            className="delete-btn"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </motion.button>
        </div>
      </div>
      <div className="sub-todos-container">
        {todos.map((element) => {
          if (element.subTo == id) {
            return (
              <Todo
                todo={element}
                todos={todos}
                setTodos={setTodos}
                userData={userData}
                id={String(element._id)}
                key={String(element._id)}
                draggedItemId={draggedItemId}
                setDraggedItemId={setDraggedItemId}
              ></Todo>
            );
          }
        })}
      </div>
    </>
  );
};

export default Todo;
