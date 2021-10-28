import { React, useState, useContext } from "react";
import { LoggedInContext } from "../LoggedInContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faSignOutAlt,
  faMoon,
  faCog,
  faSignInAlt,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

//this is temproray til i think about it, cuz light mode suck the life outta my eyes
document.body.classList.add("dark");
const Header = ({ name, setUserData }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const darkModeHandler = () => {
    setIsDarkMode(!isDarkMode);
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
            <FontAwesomeIcon icon={faSignOutAlt} />
          </motion.li>
        )}
        <motion.li
          onClick={darkModeHandler}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </motion.li>
        <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <FontAwesomeIcon icon={faCog} />
        </motion.li>
      </ul>
    </header>
  );
};

export default Header;
