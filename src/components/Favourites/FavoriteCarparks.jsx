import React, { useEffect } from "react";
import axios from "axios";
import GeoConverter from "../Maps/GeoConverter.jsx";

export default function FavoriteCarparks({ favCarparks, lotsFromURA }) {
  let newCarparkList = [];
  let favCarparksList = [];
  if (lotsFromURA && favCarparks) {
    console.log("carparks: ", favCarparks);
    console.log("available lots: ", GeoConverter(lotsFromURA));
    newCarparkList = GeoConverter(lotsFromURA);
    favCarparksList = favCarparks.map((carpark) => {
      let current = newCarparkList.find(
        (c) => c.carparkNo === carpark.carparkNo
      );
      console.log("current", current);
      if (current) {
        return {
          ...carpark,
          lat: current.position.lat,
          lng: current.position.lng,
        };
      }
    });
    console.log("new list: ", favCarparksList);
  }
  return (
    <ul>
      {favCarparksList.map((carpark, index) => (
        <li key={String(index)}>
          <a
            onClick={() => {
              window.open(
                "https://www.google.com/maps/search/?api=1&query=" +
                  carpark.lat +
                  "%2C" +
                  carpark.lng,
                "_blank"
              );
            }}
          >
            {carpark.carparkName}
          </a>
        </li>
      ))}
    </ul>
  );
}
