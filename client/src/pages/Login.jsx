import { React, useState } from "react";
import { Link } from "react-router-dom";
import { loginHandler } from "../utils/utils";
import { motion } from "framer-motion";

const Login = ({ userData, setUserData, isLoggedIn, setIsLoggedIn }) => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  return (
    <div className="login-container">
      <form action="" className="login-form">
        <h1>Log in</h1>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail or Phone"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          {loginMsg && <p>{loginMsg}</p>}
        </div>
        <div className="btn-container">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={(e) => {
                loginHandler(
                  e,
                  setUserData,
                  isLoggedIn,
                  setIsLoggedIn,
                  email,
                  password,
                  setLoginMsg
                );
              }}
            >
              Log in
            </button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link className="link" to="/signup">
              <button>Sign up</button>
            </Link>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default Login;
