import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import myPlaces from "./FilteredList.jsx";
import axios from "axios";
import { async } from "regenerator-runtime";

export function Map ({
  userLocation,
  userZoom,
  setMounted,
  mounted,
  lotsFromURA,
  currentUserId,
  token,
  favCarparks,
  setFavCarparks,
  showUserProfile,
}) {
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat: 1.287953, lng: 103.851784 });
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(false);
  const [isFiltered, setisFiltered] = useState(false);
  const [newList, setnewList] = useState([]);

  useEffect(() => {
    setCenter(userLocation);
    setZoom(userZoom);
  }, [userLocation]);

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();

    myPlaces.forEach((place) => {
      bounds.extend(place.position);
    });

    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

    useEffect(() => {
      setCenter({ lat: 1.290270, lng: 103.851959 })
      setZoom(10)
  }, [showUserProfile]);

  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.ppCode]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    // console.log(place);
    setSelectedPlace(place);

    setInfoOpen(true);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }
    // if you want to center the selected Marker
    setCenter(place.pos);
  };

  function openMapsHandler(event, selectedPlace) {
    const { lat, lng } = selectedPlace.position;
    window.open(
      "https://www.google.com/maps/search/?api=1&query=" + lat + "%2C" + lng,
      "_blank"
    );
  }

  function handleRemoveFavoriteCarpark(carparkInfo) {
    // Delete from displaying list
    let newFavoriteCarparks = favCarparks.filter(
      (c) => c.carparkNo !== carparkInfo.carparkNo
    );
    setFavCarparks(newFavoriteCarparks);

    // Update DB user_carparks table
    axios
      .post("/deleteFavoriteCarpark", carparkInfo, Headers)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  }

  async function favouritesHandler(event, selectedPlace) {
    const { ppCode, parkingSystem, ppName } = selectedPlace;
    const userCarparkInfo = {
      userId: currentUserId,
      carparkNo: ppCode,
      lotType: parkingSystem,
      carparkName: ppName,
    };

    const Headers = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post("/addCarpark", userCarparkInfo, Headers)
      .then((result) => {
        if (result.data.delete) {
          let carparkInfo = {
            carparkId: result.data.delete,
            userId: currentUserId,
            carparkNo: ppCode,
          };
          // alert("Remove carpark from my favorite carpark list");
          handleRemoveFavoriteCarpark(carparkInfo);
        } else {

          let newFavoriteCarpark = result.data.newFavoriteCarpark;
          let newFavoriteCarparks = [...favCarparks, newFavoriteCarpark];
          setFavCarparks(newFavoriteCarparks);
        }
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  }
  if (mounted && lotsFromURA != undefined && !isFiltered) {
    const newList = myPlaces.map((item) => {
      let variable = lotsFromURA.find((c) => item.ppCode === c.carparkNo);
      let availableLots = 0;
      if (variable !== undefined) {
        availableLots = variable.lotsAvailable;
      }
      return {
        ...item,
        lotsAvailable: Number(availableLots),
      };
    });
    setisFiltered(true);
    setnewList(newList);
  }


  if (newList.length > 0) {
    return (
      <GoogleMap
        onLoad={loadHandler}
        zoom={zoom}
        center={center}
        mapContainerClassName="map-container"
      >
        <MarkerClusterer>
          {(clusterer) =>
            newList.map((place) => (
              <Marker
                key={place.ppCode}
                clusterer={clusterer}
                position={place.position}
                onLoad={(marker) => markerLoadHandler(marker, place)}
                onClick={(event) => markerClickHandler(event, place)}
              />
            ))
          }
        </MarkerClusterer>

        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.ppCode]}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="text-center">
              <h6 className="text-center">{selectedPlace.ppName}</h6>
              <hr style={{margin: "0 0 5px 0"}}/>
              {/* <div>{selectedPlace.ppCode}</div> */}
              <div>Available Lots: {selectedPlace.lotsAvailable}</div>
              <div>Vehicle Category:{selectedPlace.vehCat}</div>
              <div>Weekday Rate: {selectedPlace.weekdayRate}</div>
              <div>Weekend Rate: {selectedPlace.satdayRate}</div> 
              <div>Operation Time: {selectedPlace.startTime} - {selectedPlace.endTime}</div> 
              <br />
              <div className="d-flex flex-row justify-content-around align-items-center">
              <a
                type="button"
                style={{marginLeft: "10px"}}
                onClick={(event) => openMapsHandler(event, selectedPlace)}
              >
                <i className="bi bi-map" style={{fontSize: "20px", color: "blue"}}></i>
              </a>
              &nbsp;
              <a
                type="button"
                style={{marginRight: "10px"}}
                onClick={(event) => favouritesHandler(event, selectedPlace)}
              >
                <i className="bi bi-heart favIcon" style={{fontSize: "20px", color: "red"}}></i>
              </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}
