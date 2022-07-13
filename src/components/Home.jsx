import React, { useEffect, useState } from "react";
import axios from "axios";
// import { async } from "regenerator-runtime";

export default function Home({ token, currentUserId }) {
  const [map, setMap] = useState();
  const [favCarparks, setFavCarparks] = useState([]);

  useEffect(() => {
    fetchProtectedDate();
    getAvailableCarparkInfo();
  }, []);

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
        console.log(result.data.carparks);
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
    axios
      .get("/favoriteCarparks", {
        userId: 2,
      })
      .then((result) => {
        console.log(result.data);
        setFavCarparks(result.data);
      })
      .catch((error) => {
        console.log("Unable to fetch carpark info: ", error);
      });
  };

  useEffect(() => {
    getFavoriateCarparks();
  }, [favCarparks]);

  return (
    <div>
      <h1>Home page</h1>
      <p>{map}</p>
      <button onClick={addCarpark}>Add Carpark to Favoriate</button>
      <div>
        <h5>My Favouriate Carparks</h5>
        {favCarparks.map}
      </div>
    </div>
  );
}
