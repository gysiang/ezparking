import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home({ token }) {
  const [map, setMap] = useState();

  useEffect(() => {
    fetchProtectedDate();
  }, []);

  const fetchProtectedDate = async () => {
    axios
      .get("/homepage", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setMap(result.data.value);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  };

  return (
    <div>
      <h1>Home page</h1>
      <p>{map}</p>
    </div>
  );
}
