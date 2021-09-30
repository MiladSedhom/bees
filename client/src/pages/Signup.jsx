import { React, useState } from "react";

import axios from "axios";

const Signup = () => {
  //states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //functions
  const signUp = async () => {
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/users",
      headers: {},
      data: { name, email, password },
    });
  };

  return (
    <div className="signup-container">
      <form action="" className="signup-form">
        <h1>Sign up</h1>
        <div className="input-container">
          <input
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type={"email" && "phone"}
            placeholder="E-mail or Phone"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="User Name"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </div>

        <div className="btn-container">
          <button onClick={signUp}>Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
