import { getCarparks } from "../../helper";
import allCarparks from "../../../carparks-all.json";
const { Result } = allCarparks; // can pass the carpark info from backend to <allCarparks>
const filteredList = getCarparks(Result);
import proj4 from "proj4";

const filtedlatlong = filteredList.map((item, index) => {
  let north = parseFloat(item.geometries[0].coordinates.split(",")[0]);
  let east = parseFloat(item.geometries[0].coordinates.split(",")[1]);

  proj4.defs(
    "EPSG:3414",
    "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs"
  );

  let coords = proj4("EPSG:3414").inverse([north, east]);

  let position = {
    lat: coords[1],
    lng: coords[0],
  };
  return { ...item, position: position };
});

export default filtedlatlong;
