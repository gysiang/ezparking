import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

import MapContainer from "./components/Maps/MapContainer.jsx";
import GetUserGeolocation from "./components/Maps/UserGeoLocation.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignupPage, setDisplaySignupPage] = useState(false);
  const [token, setToken] = useState("");
  const [apiKEY, setapiKEY] = useState("");

  const getGoogleAPIKEY = () => {
    axios
      .get("/apiKey")
      .then((result) => {
        setapiKEY(result.data.key)
      })
      .catch((error) => {
        console.log("Unable to fetch data: ", error);
      });
  };

    useEffect(() => {
    getGoogleAPIKEY();
  }, []);

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
      <MapContainer apiKEY={apiKEY}/>
      <GetUserGeolocation />
    </div>
  );
}
