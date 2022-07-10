import React, { useState } from "react";
import axios from "axios";

export default function Login({ setIsSignedup, setIsLoggedIn }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = () => {
    const user = {
      email: userEmail,
      password: userPassword,
    };

    axios
      .post("/login", user)
      .then((result) => {
        if (result.data !== "Unauthoried user") {
          setIsLoggedIn(true);
          console.log(result.data);
        } else {
          alert("Unauthorized user");
        }
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });

    setUserEmail("");
    setUserPassword("");
  };

  const showSignupForm = () => {
    setIsSignedup(true);
  };

  return (
    <div className="">
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
      <button type="button" onClick={handleLogin}>
        LOG IN
      </button>
      <button type="button" onClick={showSignupForm}>
        SIGN UP
      </button>
    </div>
  );
}
