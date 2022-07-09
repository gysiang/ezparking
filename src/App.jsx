import axios from "axios";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div>
      <div>
        {!isLoggedIn && !isSignup && <Signup setIsSignup={setIsSignup} />}
        {isSignup && <Login setIsLoggedIn={setIsLoggedIn} />}
      </div>
    </div>
  );
}
