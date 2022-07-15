import React, { useState } from "react";
import axios from "axios";

export default function Navbar({ setShowUserProfile }) {
  return (
    <nav className="nav d-flex justify-content-between align-items-center px-3">
      <a
        onClick={() => {
          setShowUserProfile(true);
        }}
      >
        Avatar
      </a>
      <a href="" className="logoutIcon">
        <i class="bi bi-box-arrow-right"></i>
      </a>
    </nav>
  );
}
