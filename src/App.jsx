import axios from "axios";
import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

function MapContainer () {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:PUBLIC_GOOGLE_MAPS_API_KEY,
   });

   if (!isLoaded) return <div>Loading...</div>
   return <Map/>
}
function Map() {
  return (
    <GoogleMap 
    zoom={20}
    center={{lat:1.3919935522366003,lng:103.89492287401924}}
    mapContainerClassName="map-container">
    <Marker position={{lat:1.3919935522366003,lng:103.89492287401924}}/>
    </GoogleMap>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignupPage, setDisplaySignupPage] = useState(false);
  const [token, setToken] = useState("");

  console.log("signed up status: ", displaySignupPage);
  console.log("login status: ", isLoggedIn);
  console.log("token: ", token);

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
      <MapContainer />
    </div>
  );
}
