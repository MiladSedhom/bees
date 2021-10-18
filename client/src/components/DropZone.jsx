import React from "react";
import { motion } from "framer-motion";
import { updateTodos } from "../utils/utils";

const DropZone = ({
  index,
  todo,
  todos,
  setTodos,
  draggedItemId,
  userId,
  category,
}) => {
  const onDropHandler = (e) => {
    e.stopPropagation();
    e.target.classList.remove("drag-over");
    const updatedTodos = todos.map((element) => {
      if (element._id == draggedItemId) {
        element.index = index;
        element.category = category;
        return element;
      } else if (Number(element.index) >= Number(todo.index)) {
        element.index = String(Number(element.index) + 1);
        return element;
      }
      return element;
    });
    updateTodos(updatedTodos, userId);
    setTodos(updatedTodos);
  };

  return (
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
      onDrop={onDropHandler}
    ></motion.div>
  );
};

export default DropZone;
