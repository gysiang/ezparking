import React, { useState } from "react";
import axios from "axios";

export default function Login({
  setDisplaySignupPage,
  setIsLoggedIn,
  setCurrentUserId,
  setUserName,
  setAvatar,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  

  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = () => {
    let user;
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
    if(!userEmail || !userPassword){
      alert('Your email or password is empty!')
    } else if (!emailPattern.test(userEmail)){
      alert("Invalid email!")
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
          if(result.data.msg === "user is not found") {
            alert('User is not found!');
          } else if(result.data.msg === "wrong password" || result.data.msg === "unauthorized user") {
            alert("Unauthorized user!");
          } 
          if (result.data.user) {
            setIsLoggedIn(true);
            setCurrentUserId(result.data.user.id);
            setUserName(result.data.user.name);
            setAvatar(result.data.user.avatar);
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
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          value={userEmail}
          onChange={userEmailChange}
          placeholder="Email"
          className="form-control my-1"
          required="required"
        />
        <input
          type="password"
          value={userPassword}
          onChange={userPasswordChange}
          placeholder="Password"
          className="form-control my-1"
          required="required"
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
