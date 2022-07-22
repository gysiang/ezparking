import React, { useEffect } from "react";
import GeoConverter from "../Maps/GeoConverter.jsx";
import allCarparks from "../../../carparks-all.json";

export default function FavoriteCarparks({ favCarparks, lotsFromURA }) {
  let newCarparkList = [];
  let favCarparksList = [];
  if (lotsFromURA && favCarparks) {
    newCarparkList = GeoConverter(lotsFromURA);
    favCarparksList = favCarparks.map((carpark) => {
      if (carpark) {
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
  }
  return (
    <ul className="mx-0 px-0">
      {favCarparksList.map((carpark, index) => (
        <li key={String(index)} style={{ listStyle: "none" }}>
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
            <i className="fa-solid fa-heart" style={{ color: "red" }}></i>{" "}
            {carpark.carparkName}
          </a>
        </li>
      ))}
    </ul>
  );
}
