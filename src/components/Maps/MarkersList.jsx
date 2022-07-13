import React from "react";
import { Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api'
import proj4 from 'proj4'
import  filteredList  from './FilteredList.jsx'

export const MarkersList = filteredList.map((locationPin,index) => {

    return (
      <li key={locationPin.ppCode}>
        <Marker position={locationPin.position}/>
      </li>
    )
});