import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Map } from "./Map.jsx";
import axios from "axios";

export default function MapContainer({ apiKey, currentUserId, token }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map currentUserId={currentUserId} token={token} />;
}
