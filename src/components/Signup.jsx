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
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
    let newUser;
    if (!userName || !userPassword || !userEmail) {
      alert("Please input your name, email and password");
    } else if (!emailPattern.test(userEmail)) {
      alert("Invalid email!");
    } else {
      newUser = {
        name: userName,
        email: userEmail,
        password: userPassword,
        avatar:
          "https://ezparking1.s3.ap-southeast-1.amazonaws.com/uploads/img_avatar.png",
      };
    }

    if (newUser) {
      axios
        .post("/signup", newUser)
        .then((result) => {
          if (result.data.msg === "User signup error.") {
            alert("User already signed up.");
            return;
          }
          setDisplaySignupPage(false);
          alert("user registered, please log in now!");
        })
        .catch((error) => {
          console.log("Error message: ", error);
        });

      setUserName("");
      setUserEmail("");
      setUserPassword("");
    }
  };

  const handleSignin = () => {
    setDisplaySignupPage(false);
  };

  return (
    <div className="loginDiv d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column border p-2 align-items-center rounded">
        <h5>Create account</h5>
        <div className="my-1 userIcon">
          <i className="bi bi-person-circle"></i>
        </div>
        <input
          type="text"
          value={userName}
          onChange={userNameChange}
          placeholder="Name"
          className="form-control my-1"
          required="required"
        />
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
          onClick={handleSignup}
          className="form-control bg-primary my-1"
        >
          SIGN UP
        </button>
        <button
          type="button"
          onClick={handleSignin}
          className="form-control bg-info my-1"
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
}
