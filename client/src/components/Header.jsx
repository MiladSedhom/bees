import { React, useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faDoorOpen,
  faMoon,
  faCog,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { render } from "@testing-library/react";
import { motion } from "framer-motion";

const Header = ({ isLoggedIn, name, setIsLoggedIn, setUserData }) => {
  const darkModeHandler = () => {
    document.body.classList.toggle("dark");
  };
  return (
    <header>
      <Link to="/" id="to-home">
        <motion.h1 whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          BEES
        </motion.h1>
      </Link>

      <ul>
        {isLoggedIn && <div className={"online"}> {name} </div>}
        {!isLoggedIn ? (
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} />
            </Link>
          </motion.li>
        ) : (
          <motion.li
            style={{ color: "red" }}
            onClick={(e) => {
              setIsLoggedIn(false);
              setUserData({});
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faSignInAlt} />
          </motion.li>
        )}
        <motion.li
          onClick={darkModeHandler}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faMoon} />
        </motion.li>
        <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <FontAwesomeIcon icon={faCog} />
        </motion.li>
      </ul>
    </header>
  );
};

export default Header;
