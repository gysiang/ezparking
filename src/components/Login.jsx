import React, { useState } from "react";
import axios from "axios";

export default function Login({
  setDisplaySignupPage,
  setIsLoggedIn,
  setCurrentUserId,
  setUserName,
}) {
  const [userEmail, setUserEmail] = useState("eva.fang.wang@gmail.com");
  const [userPassword, setUserPassword] = useState("123");

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
        if (result.data !== "Unauthorized user") {
          setIsLoggedIn(true);
          setCurrentUserId(result.data.user.id);
          setUserName(result.data.user.name);
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
    setDisplaySignupPage(true);
  };

  return (
    <div className="loginDiv d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column border p-2 align-items-center rounded">
        <div className="my-1 userIcon">
          <i className="bi bi-person-circle"></i>
        </div>
        <input
          type="text"
          value={userEmail}
          onChange={userEmailChange}
          placeholder="Email"
          className="form-control my-1"
        />
        <input
          type="password"
          value={userPassword}
          onChange={userPasswordChange}
          placeholder="Password"
          className="form-control my-1"
        />
        <button
          type="button"
          onClick={handleLogin}
          className="form-control bg-info my-1"
        >
          LOG IN
        </button>
        <button
          type="button"
          onClick={showSignupForm}
          className="form-control bg-primary my-1"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
