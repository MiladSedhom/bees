import React from "react";
import {
  updateTodos,
  updateNameInTodos,
  updateSubToInUiOnDrop,
  updateCategoryInUiOnDrop,
  deleteTodos,
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

  return (
    <>
      <motion.div
        className="drop-area"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.target.classList.add("drag-over");
        }}
        onDragLeave={(e) => {
          e.target.classList.remove("drag-over");
        }}
        onDrop={(e) => {
          e.target.classList.remove("drag-over");
          console.log(todos);
          setTodos(
            todos.map((element) => {
              if (element.index > todo.index) {
                element.index = element.index + 1;
                return element;
              } else if ((element.id = draggedItemId)) {
                element.index = todo.index;
                return element;
              }
              return element;
            })
          );
          console.log(todos);
        }}
      ></motion.div>
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
            updateTodos(
              [
                {
                  category: todo.category.toLowerCase(),
                  id: draggedItemId,
                  subTo: id,
                },
              ],
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
            updateTodos(
              [
                {
                  name: e.target.innerHTML.replaceAll("&nbsp;", ` `),
                  isDone: todo.isDone,
                  category: todo.category,
                  id: id,
                },
              ],
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
              const updatedTodos = await updateTodos(
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
            onClick={(e) => {
              setTodos(todos.filter((element) => element._id != id));
              deleteTodos([{ id: id }], userData.id);
            }}
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
