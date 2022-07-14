import React, {useState} from "react";
import { useLoadScript } from '@react-google-maps/api'
import { Map } from "./Map.jsx";
import axios from "axios";
import FilteredList from './FilteredList.jsx'

export default function MapContainer ({apiKey, userLocation, userZoom, setMounted, lotsFromURA}) {

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey
   });

   if (!isLoaded) return <div>Loading...</div>
   return <Map userLocation={userLocation} userZoom={userZoom} setMounted={setMounted} lotsFromURA={lotsFromURA}/>
}