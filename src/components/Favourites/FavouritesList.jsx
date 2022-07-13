import React from "react";
import axios from "axios";
import AllCarparks from '../../../carparks-all.json'

const {Result} = AllCarparks

// work in progress

export default async function getUserFavouriteCarpark () {

  // get all the favourite carpark from database
  const userCarpark = await axios.get("/favouriteCarpark");
  const data = [];
  //compare the carpark code and get info from carparks.all
  const newList = Result.map((item) => {
  let variable = userCarpark.find(elem => {
     return elem.carparkNo === item.ppCode;
  })
  data.push(variable)
});

  return data;
}

