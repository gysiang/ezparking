import axios from "axios";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignupPage, setDisplaySignupPage] = useState(false);
  const [token, setToken] = useState("");

  return (
    <div>
      <div>
        {isLoggedIn && token ? (
          <Home token={token} />
        ) : !displaySignupPage ? (
          <Login
            setDisplaySignupPage={setDisplaySignupPage}
            setIsLoggedIn={setIsLoggedIn}
            setToken={setToken}
          />
        ) : (
          <Signup setDisplaySignupPage={setDisplaySignupPage} />
        )}
      </div>
    </div>
  );
}
