import axios from "axios";
import React, { useState, useEffect, useMemo} from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import svgCoverter from './svy21.js'

// console.log(process.env.DB_DEV_NAME)

import allCarparks from '../carparks-all.json'

const { Result } = allCarparks;

function getCarparks(locations) {
  let ppCode = new Set ();
  let uniques=[];
   for (let location of locations) {
        if (!ppCode.has(location.ppCode)) {
            ppCode.add(location.ppCode);
            uniques.push(location);
        }
    }
    return uniques;
}

const filteredList = getCarparks(Result);


const MarkersList = filteredList.map((locationPin,index) => {

let cv = new svgCoverter();
let north = (locationPin.geometries[0].coordinates.split(',')[0]);
let east = (locationPin.geometries[0].coordinates.split(',')[1]);
var resultLatLon = cv.computeLatLon(north, east);

let position = {
  lat:resultLatLon.lat,
  lng:resultLatLon.lon,
}
console.log(position)

  if (index <50){
    return (
      <li key={locationPin.ppCode}>
        <Marker position={position}/>
      </li>
    )
  }
  return <></>;
});


function MapContainer () {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:"AIzaSyAbXhFVcuk-ht7aTKSvtxK1_8zIp9gFLPw",
   });

   if (!isLoaded) return <div>Loading...</div>
   return <Map/>
}

function Map() {
  const center = useMemo(() => ({
    lat:1.3919935522366003,
    lng:103.89492287401924}), []);

  return (
    <GoogleMap 
    zoom={20}
    center={center}
    mapContainerClassName="map-container">
    <ol>
    <Marker position={{lat:1.3941679247385295,lng:103.88987098640447}}/>   
    <Marker position={{lat:1.3908673566483016,lng:103.89684333566427}}/>  

    {MarkersList}
    </ol>
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
      <br/>
      <MapContainer />
    </div>
  );
}
