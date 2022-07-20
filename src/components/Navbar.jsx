import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar({ setShowUserProfile, token, setIsLoggedIn, userName, avatar }) {
  // let name = localStorage.getItem("userName")
  // let avatar = localStorage.getItem("avatar");
  // console.log(avatar)
  // console.log("avatar: ", ava)
  // console.log('user name: ', name)
  return (
    <nav className="nav d-flex justify-content-between align-items-center px-3">
      <a
        onClick={() => {
          setShowUserProfile(true);
        }}
      >
        <img src={avatar} alt="Avatar" className="avatar"/>
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
        }}
        className="logoutIcon"
      >
        <i className="bi bi-box-arrow-right"></i>
      </a>
    </nav>
  );
}
