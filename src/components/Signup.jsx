import React, { useState } from "react";
import axios from "axios";

export default function Signup({ setDisplaySignupPage }) {
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
        setDisplaySignupPage(false);
        console.log(result.data);
        alert("user registered, please log in now!");
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });

    setUserName("");
    setUserEmail("");
    setUserPassword("");
  };

  const handleSignin = () => {
    setDisplaySignupPage(false);
  };

  return (
    <div className="loginDiv d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column">
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
        type="password"
        value={userPassword}
        onChange={userPasswordChange}
        placeholder="Password"
      />
      <button type="button" onClick={handleSignup}>
        SIGN UP
      </button>
      <button type="button" onClick={handleSignin}>
        SIGN IN
      </button>
    </div>
  );
}
