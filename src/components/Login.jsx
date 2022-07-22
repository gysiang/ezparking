import React, { useState } from "react";
import axios from "axios";

export default function Login({
  setDisplaySignupPage,
  setIsLoggedIn,
  setCurrentUserId,
  setUserName,
  setAvatar,
}) {
  const [userEmail, setUserEmail] = useState("coco@gmail.com");
  const [userPassword, setUserPassword] = useState("123");
  

  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = () => {
    let user;
    if(!userEmail || !userPassword){
      alert('Your email or password is empty!')
    } else {
      user = {
      email: userEmail,
      password: userPassword,
    };
  }

    if(user){
      axios
        .post("/login", user)
        .then((result) => {
          console.log("msg:", result.data)
          if (result.data !== "Unauthorized user" && result.data !== "wrong password") {
            setIsLoggedIn(true);
            setCurrentUserId(result.data.user.id);
            setUserName(result.data.user.name);
            setAvatar(result.data.user.avatar);
            console.log("login: ", result.data.user.avatar)
          } else {
            alert("Unauthorized user");
          }
    
        })
        .catch((error) => {
          console.log("Error message: ", error);
        });
    }

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
          required
        />
        <input
          type="password"
          value={userPassword}
          onChange={userPasswordChange}
          placeholder="Password"
          className="form-control my-1"
          required
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
