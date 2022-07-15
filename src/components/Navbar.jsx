import React, { useState } from "react";
import axios from "axios";

export default function Navbar() {
  return (
    <nav className="nav d-flex justify-content-between align-items-center">
      <a href="">Avatar</a>
      <a href="">Log out</a>
    </nav>
  );
}
