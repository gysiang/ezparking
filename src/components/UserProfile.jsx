import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile({ currentUserId, userName }) {
  const [userAvatar, setUserAvatar] = useState(null);

  return (
    <div>
      This is user profile page!
      <img src="" alt="" />
      <p>User Name: {userName}</p>
    </div>
  );
}
