import React, { useEffect, useState } from "react";
import axios from "axios";
import MapContainer from "./Maps/MapContainer.jsx";
import GetUserGeolocation from "./Maps/UserGeoLocation.jsx";
import Navbar from "./Navbar.jsx";
import UserProfile from "./UserProfile.jsx";

export default function Home({ token, currentUserId, apiKey }) {
  const [favCarparks, setFavCarparks] = useState([]);
  const [showUserProfile, setShowUserProfile] = useState(false);

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
        // setMap(result.data.value);
        console.log(result.data);
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

  const getFavoriateCarparks = () => {
    const user = {
      userId: currentUserId,
    };
    axios
      .get("/favoriteCarparks", user)
      .then((result) => {
        console.log(result.data);
        setFavCarparks(result.data.favoriteCarparks);
      })
      .catch((error) => {
        console.log("Unable to fetch carpark info: ", error);
      });
  };

  useEffect(() => {
    getFavoriateCarparks();
  }, []);

  return (
    <div>
      {!showUserProfile ? (
        <div>
          <Navbar setShowUserProfile={setShowUserProfile} />
          <h1>Home page</h1>
          <div>
            <MapContainer
              apiKey={apiKey}
              currentUserId={currentUserId}
              token={token}
            />
            <GetUserGeolocation />
          </div>
          <div>
            <h5>My Favouriate Carparks</h5>
            <ul>
              {favCarparks.map((carpark, idx) => (
                <li key={String(idx)}>
                  <a href="">{carpark.carparkName}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <UserProfile />
      )}
    </div>
  );
}
