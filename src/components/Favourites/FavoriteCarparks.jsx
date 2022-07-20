import React, { useEffect } from "react";
import GeoConverter from "../Maps/GeoConverter.jsx";
import allCarparks from "../../../carparks-all.json";

export default function FavoriteCarparks({ favCarparks, lotsFromURA }) {
  let newCarparkList = [];
  let favCarparksList = [];
  if (lotsFromURA && favCarparks) {
    newCarparkList = GeoConverter(lotsFromURA);
    console.log("carparks: ", favCarparks)
      favCarparksList = favCarparks.map((carpark) => {
        if(carpark){
          let current = newCarparkList.find(
            (c) => c.carparkNo === carpark.carparkNo
          );
          if (current) {
            return {
              ...carpark,
              lat: current.position.lat,
              lng: current.position.lng,
            };
          } else {
            let allCarparksList = GeoConverter(allCarparks.Result);
            let crt = allCarparksList.find((c) => c.ppCode === carpark.carparkNo);
            return {
              ...carpark,
              lat: crt.position.lat,
              lng: crt.position.lng,
            };
          }
        }
      });
      console.log("current carpark list:",favCarparksList)
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
