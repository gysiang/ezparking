import React, {useMemo, useState} from "react";
import { GoogleMap, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api'
import myPlaces from './FilteredList.jsx'

export function Map() {
  // const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(false);

  const center = useMemo(() => ({
    lat:1.3919935522366003,
    lng:103.89492287401924}), []);

    // Iterate myPlaces to size, center, and zoom map to contain all markers
  // const fitBounds = map => {
  //   const bounds = new window.google.maps.LatLngBounds();

  //   myPlaces.forEach(place => {
  //     bounds.extend(place.position);
  //   });

  //   map.fitBounds(bounds);
  // };

  // const loadHandler = map => {
  //   // Store a reference to the google map instance in state
  //   setMapRef(map);
  //   // Fit map bounds to contain all markers
  //   fitBounds(map);
  // };

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
    //setCenter(place.pos)
  };

  return (
    <GoogleMap 
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
        <button>Open Maps</button>
        <button>Favourite</button>
    </div>
    </InfoWindow>
     )}
    
    </GoogleMap>
  )
}