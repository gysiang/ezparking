import axios from "axios";
import React, { useState, useEffect, useMemo, useInsertionEffect } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignupPage, setDisplaySignupPage] = useState(false);
  const [token, setToken] = useState("");
  const [apiKey, setapiKey] = useState("");

  const [currentUserId, setCurrentUserId] = useState(null);
  const [userName, setUserName] = useState();
  const [avatar, setAvatar] = useState();
  // const [userName, setUserName] = useState(() => {
  //   const storedName = localStorage.getItem('userName');
  //   const initName = JSON.parse(storedName);
  //   return initName || "";
  // });

  // const [avatar, setAvatar] = useState(() => {
  //   const storedAvatar = localStorage.getItem('avatar');
  //   const initVal = JSON.parse(storedAvatar);
  //   return initVal || "";
  // });

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(userName));
    localStorage.setItem("avatar", JSON.stringify(avatar));
  }, [userName, avatar]);

  const isUserLoggedIn = () => {
    axios
      .get("/currentUser")
      .then((result) => {
        setIsLoggedIn(result.data.isLoggedIn);
        setCurrentUserId(result.data.userId);
        setapiKey(result.data.APIKEY);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  };

  return (
    <div className="mainContainer">
      {isLoggedIn ? (
        <Home
          token={token}
          currentUserId={currentUserId}
          apiKey={apiKey}
          setIsLoggedIn={setIsLoggedIn}
          userName={userName}
          setUserName={setUserName}
          avatar={avatar}
          setAvatar={setAvatar}
        />
      ) : !displaySignupPage ? (
        <Login
          setDisplaySignupPage={setDisplaySignupPage}
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUserId={setCurrentUserId}
          setUserName={setUserName}
          setAvatar={setAvatar}
        />
      ) : (
        <Signup setDisplaySignupPage={setDisplaySignupPage} />
      )}
    </div>
  );
}