import axios from "axios";
import React, { useState, useEffect, useMemo} from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

import MapContainer from "./components/Maps/MapContainer.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div>
      <div>
        {!isLoggedIn && <Signup setIsSignup={setIsSignup} />}
        {isSignup && (
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
      <br/>
      <MapContainer />
    </div>
  );
}
