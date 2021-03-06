import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileUploader } from "./FileUploader.jsx";
import { result } from "lodash";

export default function UserProfile({
  showUserProfile,
  setShowUserProfile,
  userName,
  setUserName,
  avatar,
  setAvatar,
  currentUserId,
  setIsLoggedIn,
}) {
  // const [newUserName, setNewUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  // const [userProfileImg, setuserProfileImg] = useState(avatar);
  const [selectedFile, setSelectedFile] = useState(null);

  const getUserCurrentProfile = () => {
    const user = {
      userId: currentUserId,
    };
    // route to get user info
    axios
      .get("/currentUserProfile", user)
      .then((result) => {
        setUserName(result.data.user.name);
        setUserEmail(result.data.user.email);
        setAvatar(result.data.user.avatar);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  };

  const putUserAvatar = () => {
    const avatarImg = {
      avatar: avatar,
    };
    axios
      .put("/updateUserAvatar", avatarImg)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  };

  const userNameChange = (e) => {
    setUserName(e.target.value);
  };

  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleEditUserProfile = () => {
    const user = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    // need route to edit user profile
    axios
      .put("/currentUserProfile", user)
      .then((result) => {
        if (result.data == "success") {
          alert("Successfully Edited User Profile");
          setShowUserProfile(false);
        } else {
          alert("Edit User Profile Failed");
        }
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  };

  useEffect(() => {
    getUserCurrentProfile();
  }, []);

  useEffect(() => {
    putUserAvatar();
    localStorage.setItem("avatar", JSON.stringify(avatar));
  }, [avatar]);

  const handleDeleteUser = () => {
    alert("Are you sure???");
    axios
      .delete("/deleteUser")
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <div className="userProfileDiv d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column border p-2 align-items-center rounded">
        <h5>User Profile</h5>
        <img
          src={avatar}
          style={{ width: "80px", height: "80px", borderRadius: "40px" }}
        />
        <br />
        <FileUploader
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setAvatar={setAvatar}
        />
        <input
          type="text"
          value={userName}
          onChange={userNameChange}
          placeholder="Name"
          className="form-control my-1"
        />
        <input
          type="text"
          value={userEmail}
          onChange={userEmailChange}
          placeholder="Email"
          className="form-control my-1"
        />
        <input
          type="password"
          value={userPassword}
          onChange={userPasswordChange}
          placeholder="Password"
          className="form-control my-1"
        />
        <button
          type="button"
          onClick={handleEditUserProfile}
          className="form-control bg-primary my-1"
        >
          SUBMIT
        </button>
        <button
          type="button"
          onClick={() => {
            setShowUserProfile(false);
          }}
          className="form-control bg-info my-1"
        >
          Home
        </button>
        <hr />
        <button
          type="button"
          onClick={handleDeleteUser}
          className="form-control bg-danger my-1"
        >
          Delete account
        </button>
      </div>
    </div>
  );
}
