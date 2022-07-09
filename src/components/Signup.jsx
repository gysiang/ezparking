import React, { useState } from "react";
import axios from "axios";

export default function Signup({ setIsSignup }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userNameChange = (e) => {
    setUserName(e.target.value);
  };

  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSignup = () => {
    const newUser = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    axios
      .post("/signup", newUser)
      .then((result) => {
        setIsSignup(true);
        console.log(result.data);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  };

  return (
    <div>
      <div>
        <h5>Create account</h5>
      </div>
      <input
        type="text"
        value={userName}
        onChange={userNameChange}
        placeholder="Name"
      />
      <input
        type="text"
        value={userEmail}
        onChange={userEmailChange}
        placeholder="Email"
      />
      <input
        type="text"
        value={userPassword}
        onChange={userPasswordChange}
        placeholder="Password"
      />
      <button type="button" onClick={handleSignup}>
        SIGN UP
      </button>
    </div>
  );
}
