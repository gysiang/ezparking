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
        {!isLoggedIn && <Signup setIsSignup={setIsSignup} />}
        {isSignup && (
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </div>
  );
}
