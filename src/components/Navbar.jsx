import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavbarImg } from "./Avatar.jsx";

export default function Navbar({ setShowUserProfile, token, setIsLoggedIn, userName, avatar }) {

  return (
    <nav className="nav d-flex justify-content-between align-items-center px-3">
      <a
        onClick={() => {
          setShowUserProfile(true);
        }}
      > 
        {/* <img src={avatar} key={avatar} alt="Avatar" className="avatar"/> */}
        <NavbarImg avatar={avatar}/>
        {" "}{userName}
      </a>
      <a
        onClick={() => {
          axios.post("/logout", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setIsLoggedIn(false);
          localStorage.clear();

        }}
        className="logoutIcon"
      >
        <i className="bi bi-box-arrow-right"></i>
      </a>
    </nav>
  );
}
