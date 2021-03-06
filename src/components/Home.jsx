import React, { useEffect, useState } from "react";
import axios from "axios";
import MapContainer from "./Maps/MapContainer.jsx";
import GetUserGeolocation from "./Maps/UserGeoLocation.jsx";
import Navbar from "./Navbar.jsx";
import UserProfile from "./UserProfile.jsx";
import FavoriteCarparks from "./Favourites/FavoriteCarparks.jsx";
// import GeoConverter from "./Maps/GeoConverter.jsx";
import { Spinner } from "./Spinner/Spinner.jsx";

export default function Home({
  token,
  currentUserId,
  apiKey,
  setIsLoggedIn,
  userName,
  setUserName,
  avatar,
  setAvatar,
}) {
  const [map, setMap] = useState();
  const [favCarparks, setFavCarparks] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [lotsFromURA, setlotsFromURA] = useState();
  const [userLocation, setuserLocation] = useState();
  const [userZoom, setuserZoom] = useState(0);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showCarparkProfile, setshowCarparkProfile] = useState(false);

  const showHomepage = () => {
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
        setlotsFromURA(result.data.carparks);
      })
      .catch((error) => {
        console.log("Unable to fetch carpark data: ", error);
      });
  };

  const getFavoriteCarparks = () => {
    const user = {
      userId: currentUserId,
    };
    axios
      .get("/favoriteCarparks", user)
      .then((result) => {
        setFavCarparks(result.data.favoriteCarparks);
      })
      .catch((error) => {
        console.log("Unable to fetch carpark info: ", error);
      });
  };

  useEffect(() => {
    showHomepage();
    getAvailableCarparkInfo();
    getFavoriteCarparks();
  }, []);

  useEffect(() => {
    if (lotsFromURA != undefined) {
      setMounted(true);
    }
  }, [lotsFromURA]);

  useEffect(() => {}, [mounted]);

  return (
    <div className="">
      {!showUserProfile ? (
        <div>
          <Navbar
            setShowUserProfile={setShowUserProfile}
            token={token}
            setIsLoggedIn={setIsLoggedIn}
            currentUserId={currentUserId}
            userName={userName}
            avatar={avatar}
          />
          <h3 className="text-center mt-2">EZ Parking</h3>
          <div className="d-flex flex-row justify-content-evenly align-items-center catIcons m-0">
            <i
              className="fa-solid fa-motorcycle"
              style={{ color: "yellow" }}
            ></i>
            <i className="fa-solid fa-car" style={{ color: "blue" }}></i>
            <i
              className="fa-solid fa-truck-moving"
              style={{ color: "red" }}
            ></i>
          </div>
          <div className="mapDiv d-flex card flex-column justify-content-center align-items-center m-2">
            {!mounted ? (
              <div>
                <h1 className="text-center">Waiting for Map to Load</h1>
                <Spinner />
              </div>
            ) : (
              <MapContainer
                apiKey={apiKey}
                currentUserId={currentUserId}
                token={token}
                mounted={mounted}
                setMounted={setMounted}
                lotsFromURA={lotsFromURA}
                userLocation={userLocation}
                userZoom={userZoom}
                favCarparks={favCarparks}
                setFavCarparks={setFavCarparks}
                showUserProfile={showUserProfile}
                showCarparkProfile={showCarparkProfile}
                setshowCarparkProfile={setshowCarparkProfile}
              />
            )}
            <GetUserGeolocation
              setuserLocation={setuserLocation}
              setuserZoom={setuserZoom}
            />
          </div>

          <div className="favCarparksDiv card d-flex flex-column justify-content-start align-items-center  m-2">
            <h5 className="mt-1 ">My Favorite Carparks</h5>
            <hr className="mb-2" />
            <div className="d-flex flex-column overflow-scroll mx-0">
              <FavoriteCarparks
                favCarparks={favCarparks}
                lotsFromURA={lotsFromURA}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Navbar
            setShowUserProfile={setShowUserProfile}
            token={token}
            setIsLoggedIn={setIsLoggedIn}
            currentUserId={currentUserId}
            userName={userName}
            avatar={avatar}
          />
          <UserProfile
            currentUserId={currentUserId}
            showUserProfile={showUserProfile}
            setShowUserProfile={setShowUserProfile}
            userName={userName}
            setUserName={setUserName}
            avatar={avatar}
            setAvatar={setAvatar}
            setIsLoggedIn={setIsLoggedIn}
          />
        </div>
      )}
      <div className="text-center copyrightDiv position-fixed bottom-0 mb-2">
        Copyright &copy; 2022 EZ Parking
      </div>
    </div>
  );
}
