import React, { useState } from "react";
import TodosContainer from "../components/TodosContainer";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

const HomePage = ({ guestTodos, setGuestTodos, userData, isLoggedIn }) => {
  //states
  const [todos, setTodos] = useState(userData.todos);
  const [draggedItemId, setDraggedItemId] = useState("");
  const [categories, setCategories] = useState([
    { category: "daily", prefix: 0 },
    { category: "weekly", prefix: 1 },
    { category: "monthly", prefix: 2 },
  ]);

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

  const renderTodoContainers = (categories) => {
    const containers = categories.map((element) => {
      return (
        <motion.div variants={sectionVariants}>
          <TodosContainer
            category={element.category}
            prefix={element.prefix}
            counter={element.counter}
            guestTodos={guestTodos}
            setGuestTodos={setGuestTodos}
            isLoggedIn={isLoggedIn}
            todos={todos}
            setTodos={setTodos}
            userData={userData}
            draggedItemId={draggedItemId}
            setDraggedItemId={setDraggedItemId}
            setCategories={setCategories}
          />
        </motion.div>
      );
    });
    return containers;
  };
  return (
    <div className="home-page">
      <Sidebar userData={userData} />
      <main>
        <motion.section
          animate={"visible"}
          initial={"hidden"}
          variants={sectionVariants}
        >
          {renderTodoContainers(categories)}
        </motion.section>
      </main>
    </div>
  );
};

export default HomePage;
