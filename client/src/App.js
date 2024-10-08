import { React, useState } from "react";
import "./styles/style.scss";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { motion, AnimatePresence, animate } from "framer-motion";

function App() {
  const [userData, setUserData] = useState({});
  const [guestTodos, setGuestTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AnimatePresence exitBeforeEnter={true}>
      <Router>
        <div className="App">
          <Header
            isLoggedIn={isLoggedIn}
            name={userData.name}
            setIsLoggedIn={setIsLoggedIn}
            setUserData={setUserData}
          />
          <Route path="/" exact>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <HomePage
                guestTodos={guestTodos}
                setGuestTodos={setGuestTodos}
                userData={userData}
                isLoggedIn={isLoggedIn}
              />
            </motion.div>
          </Route>
          <Route path="/login">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Login
                userData={userData}
                setUserData={setUserData}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                // setLoginMsg={setLoginMsg}
              />
            </motion.div>
          </Route>
          <Route path="/signup">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Signup />
            </motion.div>
          </Route>
        </div>
      </Router>
    </AnimatePresence>
  );
}

export default App;
