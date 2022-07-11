import React from "react";
import { Marker } from '@react-google-maps/api'
import proj4 from 'proj4'
import  filteredList  from './FilteredList.jsx'

export const MarkersList = filteredList.map((locationPin,index) => {

let north = parseFloat(locationPin.geometries[0].coordinates.split(',')[0]);
let east = parseFloat(locationPin.geometries[0].coordinates.split(',')[1]);
// var resultLatLon = cv.computeLatLon(north, east);

proj4.defs("EPSG:3414","+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs");
var coords = proj4("EPSG:3414").inverse([north,east]);
// console.log(coords)

let position = {
  lat:coords[1],
  lng:coords[0],
}
// const placeData = {
//   data: locationPin,
//   pos: position,
// }
// myPlaces.push(placeData);


  if (index <50){
    return (
      <li key={locationPin.ppCode}>
        <Marker position={position}/>
      </li>
    )
  }
  return <></>;
});