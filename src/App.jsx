import axios from "axios";
import React, { useState, useEffect, useMemo, useInsertionEffect } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

import MapContainer from "./components/Maps/MapContainer.jsx";
import { result } from "lodash";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignupPage, setDisplaySignupPage] = useState(false);
  const [token, setToken] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  console.log("user id from app(): ", currentUserId);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = () => {
    axios
      .get("/currentUser")
      .then((result) => {
        console.log(result.data.isLoggedIn);
        setIsLoggedIn(result.data.isLoggedIn);
        setCurrentUserId(result.data.userId);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  };

  return (
    <div>
      <div>
        {isLoggedIn ? (
          <Home token={token} currentUserId={currentUserId} />
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
      <br />
      <MapContainer />
    </div>
  );
}
