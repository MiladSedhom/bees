import React from "react";
import {
  updateTodos,
  updateNameInTodos,
  updateSubToInUiOnDrop,
  updateCategoryInUiOnDrop,
  deleteTodos,
  createTodos,
} from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import DropZone from "./DropZone";

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

  const onDropHandler = (e) => {
    e.stopPropagation();
    if (draggedItemId != id) {
      updateCategoryInUiOnDrop(todos, setTodos, todo.category, draggedItemId);
      updateSubToInUiOnDrop(todos, setTodos, id, draggedItemId);
      updateTodos(
        [
          {
            category: todo.category.toLowerCase(),
            _id: draggedItemId,
            subTo: id,
          },
        ],
        userData.id
      );
    }
  };

  const onBlurHandler = async (e) => {
    if (isRecentlyAdded === true) {
      const recentlyAddedTodos = todos.filter(
        (element) => element.isRecentlyAdded
      );
      updateNameInTodos(
        id,
        e.target.innerHTML.replaceAll("&nbsp;", ` `),
        todos,
        setTodos
      );
      createTodos(recentlyAddedTodos, userData.id, setTodos);
      // setTodos(newTodos);
    } else {
      updateTodos(
        [
          {
            name: e.target.innerHTML.replaceAll("&nbsp;", ` `),
            isDone: todo.isDone,
            category: todo.category,
            _id: id,
            isRecentlyAdded: isRecentlyAdded,
          },
        ],
        userData.id
      );
    }
    updateNameInTodos(
      id,
      e.target.innerHTML.replaceAll("&nbsp;", ` `),
      todos,
      setTodos
    );
  };

  const doneClickHandler = async (e) => {
    const updatedTodos = await updateTodos(
      [{ isDone: !todo.isDone, _id: id }],
      userData.id
    );
    setTodos(
      todos.map((element) => {
        if (element._id == id) {
          element.isDone = !element.isDone;
          return element;
        } else {
          return element;
        }
      })
    );
  };

  const deleteClickHandler = (e) => {
    setTodos(todos.filter((element) => element._id != id));
    const subTodos = todos.filter((element) => {
      return element.subTo == id;
    });
    deleteTodos([{ _id: id }, ...subTodos], userData.id);
  };

  return (
    <>
      <DropZone
        index={todo.index}
        todo={todo}
        todos={todos}
        setTodos={setTodos}
        draggedItemId={draggedItemId}
        userId={userData.id}
        category={todo.category}
      />
      <div
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={onDropHandler}
        className={todo.isDone ? "todo done" : "todo"}
        draggable
        onDragStart={(e) => {
          setDraggedItemId(id);
        }}
      >
        <p
          className={isRecentlyAdded && "recently-added"}
          contentEditable
          onBlur={onBlurHandler}
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
            onClick={doneClickHandler}
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
            onClick={deleteClickHandler}
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
