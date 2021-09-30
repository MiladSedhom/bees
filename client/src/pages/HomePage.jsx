import React, { useState } from "react";
import TodosContainer from "../components/TodosContainer";
import { motion } from "framer-motion";

const HomePage = ({ guestTodos, setGuestTodos, userData, isLoggedIn }) => {
  //states
  const [todos, setTodos] = useState(userData.todos);
  const [draggedItemId, setDraggedItemId] = useState("");

  const sectionVariants = {
    hidden: { y: "-120%" },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <main>
      <motion.section
        animate={"visible"}
        initial={"hidden"}
        variants={sectionVariants}
      >
        <motion.div variants={sectionVariants}>
          <TodosContainer
            category="Daily"
            guestTodos={guestTodos}
            setGuestTodos={setGuestTodos}
            isLoggedIn={isLoggedIn}
            todos={todos}
            setTodos={setTodos}
            userData={userData}
            draggedItemId={draggedItemId}
            setDraggedItemId={setDraggedItemId}
          />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <TodosContainer
            category="Weekly"
            guestTodos={guestTodos}
            setGuestTodos={setGuestTodos}
            isLoggedIn={isLoggedIn}
            todos={todos}
            setTodos={setTodos}
            userData={userData}
            draggedItemId={draggedItemId}
            setDraggedItemId={setDraggedItemId}
          />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <TodosContainer
            category="Monthly"
            guestTodos={guestTodos}
            setGuestTodos={setGuestTodos}
            isLoggedIn={isLoggedIn}
            todos={todos}
            setTodos={setTodos}
            userData={userData}
            draggedItemId={draggedItemId}
            setDraggedItemId={setDraggedItemId}
          />
        </motion.div>
      </motion.section>
    </main>
  );
};

export default HomePage;
