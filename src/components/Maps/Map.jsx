import React, {useMemo} from "react";
import { GoogleMap, Marker } from '@react-google-maps/api'
import { MarkersList } from './MarkersList.jsx'


export function Map() {
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