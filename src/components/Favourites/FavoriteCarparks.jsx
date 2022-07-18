import React from "react";
import axios from "axios";

export default function FavoriteCarparks({ favCarparks }) {
  return (
    <ul>
      {favCarparks.map((carpark, index) => (
        <li key={String(index)}>
          <a href="">{carpark.carparkName}</a>
        </li>
      ))}
    </ul>
  );
}
