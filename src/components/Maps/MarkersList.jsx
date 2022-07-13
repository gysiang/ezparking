import React from "react";
import { Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api'
import proj4 from 'proj4'
import  filteredList  from './FilteredList.jsx'

export const MarkersList = filteredList.map((locationPin,index) => {

const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
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
        <Marker 
        key={locationPin.ppCode}
        clusterer={clusterer}
        onLoad={marker => markerLoadHandler(marker, place)}
        onClick={event => markerClickHandler(event, place)}
        position={locationPin.position}/>
    )
});