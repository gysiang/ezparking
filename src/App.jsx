import axios from "axios";
import React, { useState, useEffect, useMemo, useInsertionEffect } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

import MapContainer from "./components/Maps/MapContainer.jsx";
import { async } from "regenerator-runtime";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignupPage, setDisplaySignupPage] = useState(false);
  const [token, setToken] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  return (
    <div>
      <div>
        {isLoggedIn && token ? (
          <Home token={token} currentUserId={currentUserId} />
        ) : !displaySignupPage ? (
          <Login
            setDisplaySignupPage={setDisplaySignupPage}
            setIsLoggedIn={setIsLoggedIn}
            setToken={setToken}
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
