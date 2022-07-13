import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

import MapContainer from "./components/Maps/MapContainer.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignupPage, setDisplaySignupPage] = useState(false);
  const [token, setToken] = useState("");

  const addCarpark = () => {
    // Need to replace below hardcoded value with variable name: @{userId} and @{carparkId}
    const userCarparkInfo = {
      userId: 2,
      carparkId: 1,
    };
    axios
      .post("/addCarpark", userCarparkInfo)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  };

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
      <br />
      <MapContainer />
      <button onClick={addCarpark}>Add Carpark to Favoriate</button>
    </div>
  );
}
