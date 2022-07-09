import axios from "axios";
import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

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
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div>
      <div>
        {!isLoggedIn && <Signup setIsSignup={setIsSignup} />}
        {isSignup && (
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
      <MapContainer />
    </div>
  );
}
