import React from "react";
// import getLocation from "../../helper"

export default function GetUserGeolocation({ setuserLocation, setuserZoom }) {
  function success(pos) {
    const crd = pos.coords;
    const data = {
      lat: crd.latitude,
      lng: crd.longitude,
    };
    setuserLocation(data);
    setuserZoom(16);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <div className="text-center mt-3">
      <button
        id="getLocationBtn"
        type="button"
        className="btn btn-primary"
        onClick={getLocation}
      >
        My Location
      </button>
      <p id="errorMessage"></p>
    </div>
  );
}
