import React, {useMemo, useState} from "react";
import { GoogleMap, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api'
import myPlaces from './FilteredList.jsx'
import axios from "axios";

export function Map() {
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat:1.287953 ,lng:103.851784 });
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(false);

  // const center = useMemo(() => ({
  //   lat:1.3919935522366003,
  //   lng:103.89492287401924}), []);

    // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();

    myPlaces.forEach(place => {
      bounds.extend(place.position);
    });

    map.fitBounds(bounds);
  };

  const loadHandler = map => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.ppCode]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    setCenter(place.pos)
  };

  function openMapsHandler (event, selectedPlace) {
    console.log(selectedPlace)
    const {lat,lng} = selectedPlace.position
    window.open('https://www.google.com/maps/search/?api=1&query='+lat+'%2C'+lng, '_blank');
  }

  async function favouritesHandler (event, selectedPlace) {
    console.log(selectedPlace)
    const { ppCode } = selectedPlace
    await axios.post('/addCarpark',{carparkNo: ppCode})
  }

  return (
    <GoogleMap 
    onLoad={loadHandler}
    zoom={20}
    center={center}
    mapContainerClassName="map-container">

    <MarkerClusterer>
      {clusterer =>
      myPlaces.map(place => (
      <Marker
        key={place.ppCode}
        clusterer={clusterer}
        position={place.position}
        onLoad={marker => markerLoadHandler(marker, place)}
        onClick={event => markerClickHandler(event, place)}
      />
      ))
      }
    </MarkerClusterer>

    {infoOpen && selectedPlace && (
    <InfoWindow
      anchor={markerMap[selectedPlace.ppCode]}
      onCloseClick={() => setInfoOpen(false)}
    >
    <div>
      <h4>{selectedPlace.ppName}</h4>
      <hr/>
      <div>{selectedPlace.ppCode}</div>
        <p>Available Lots: {selectedPlace.lotsAvailable}</p>
        <p>Vehicle Category:{selectedPlace.vehCat}</p>
        <button 
        type="button" 
        className="btn btn-primary" 
        onClick={event => openMapsHandler(event, selectedPlace)}>
          Open Maps</button>
        &nbsp;
        <button 
        type="button" 
        className="btn btn-primary"
        onClick={event => favouritesHandler(event, selectedPlace)}>
          Favourite</button>
    </div>
    </InfoWindow>
     )}
    
    </GoogleMap>
  )
}