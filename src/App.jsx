import axios from "axios";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedup, setIsSignedup] = useState(false);

  console.log("signed up status: ", isSignedup);

  return (
    <div>
      <div>
        {isLoggedIn ? (
          <Home />
        ) : !isSignedup ? (
          <Login setIsSignedup={setIsSignedup} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Signup setIsSignedup={setIsSignedup} />
        )}
      </div>
    </div>
  );
}
