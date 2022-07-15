import axios from "axios";
import React, { useState, useEffect, useMemo, useInsertionEffect } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

import { result } from "lodash";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignupPage, setDisplaySignupPage] = useState(false);
  const [token, setToken] = useState("");
  const [apiKey, setapiKey] = useState("");

  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

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
        <Home token={token} currentUserId={currentUserId} apiKey={apiKey} />
      ) : !displaySignupPage ? (
        <Login
          setDisplaySignupPage={setDisplaySignupPage}
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUserId={setCurrentUserId}
        />
      ) : (
        <Signup setDisplaySignupPage={setDisplaySignupPage} />
      )}
    </div>
  );
}
