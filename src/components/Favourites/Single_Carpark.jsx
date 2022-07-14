import React, {useState} from "react";

function SingleCarpark (locations) {

    const {ppName, ppCode, LotsAvailable} = locations;

  return(
    <div>
      <div>Address: {ppName}</div>
      <div>CarPark Code: {ppCode}</div>
      <div>Lots Available: {LotsAvailable}</div>
      <button type="button" class="btn btn-danger">Remove Favourite</button>
      <br/>
      <hr/>
    </div>
  )
}