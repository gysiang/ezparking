import React, { useEffect, useState } from "react";
import axios from "axios";
// import { async } from "regenerator-runtime";
import MapContainer from "./Maps/MapContainer.jsx"
import GetUserGeolocation from "./Maps/UserGeoLocation.jsx";
import FilteredList from './Maps/FilteredList.jsx'

export default function Home({ token, currentUserId,apiKey }) {
  const [map, setMap] = useState();
  const [favCarparks, setFavCarparks] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [lotsFromURA, setlotsFromURA] = useState();
  const [userLocation, setuserLocation] = useState();
  const [userZoom, setuserZoom] = useState(0);

  // console.log('userlocation',userLocation)

  const fetchProtectedDate = () => {
    axios
      .get("/homepage", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setMap(result.data.value);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  };

  const getAvailableCarparkInfo = () => {
    axios
      .get("/getCarparks", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log('get available lots',result.data.carparks);
        setlotsFromURA(result.data.carparks)
      })
      .catch((error) => {
        console.log("Unable to fetch carpark data: ", error);
      });
  };

  const addCarpark = () => {
    // Need to replace below hardcoded value with variable name: @{userId} and @{carparkId}
    const userCarparkInfo = {
      userId: currentUserId,
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

  const getFavoriateCarparks = () => {
    const user = {
      userId: currentUserId,
    };
    console.log("user: ", user);
    axios
      .get("/favoriteCarparks", user)
      .then((result) => {
        // console.log(result.data);
        setFavCarparks(result.data.favoriteCarparks);
      })
      .catch((error) => {
        console.log("Unable to fetch carpark info: ", error);
      });
  };
  

  useEffect(() => {
    fetchProtectedDate();
    getAvailableCarparkInfo();
    getFavoriateCarparks();
  }, []);

  useEffect(() => {
    console.log('useEffect',lotsFromURA);
    setMounted(true)
  }, [lotsFromURA]);

  useEffect(() => {
    console.log('mounted',mounted);
  }, [mounted]);

  if (!mounted && lotsFromURA !=undefined) return (
      <div>
      <h1>Home page</h1>
      <h1>Waiting for Map to Load</h1>
    </div>
  )

  return (
    <div>
      <h1>Home page</h1>
      <p>{map}</p>
      <button onClick={addCarpark}>Add Carpark to Favourite</button>
      <div>
         <MapContainer apiKey={apiKey} lotsFromURA={lotsFromURA} userLocation={userLocation} userZoom={userZoom} setMounted={setMounted}/>
         <GetUserGeolocation setuserLocation={setuserLocation} setuserZoom={setuserZoom}/>
      </div>
      <div>
        <h5>My Favouriate Carparks</h5>
        <ul>
          {favCarparks.map((carpark, idx) => (
            <li key={String(idx)}>{carpark.carparkNo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
