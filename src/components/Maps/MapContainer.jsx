import React from "react";
import { useLoadScript } from '@react-google-maps/api'
import { Map } from "./Map.jsx";

export default function MapContainer () {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:"",
   });

   if (!isLoaded) return <div>Loading...</div>
   return <Map/>
}