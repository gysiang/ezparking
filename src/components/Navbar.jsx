import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar({ setShowUserProfile, token, setIsLoggedIn }) {
  return (
    <nav className="nav d-flex justify-content-between align-items-center px-3">
      <a
        onClick={() => {
          setShowUserProfile(true);
        }}
      >
        Avatar
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
