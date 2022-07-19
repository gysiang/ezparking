import React, {useState,useEffect} from "react";
import axios from "axios";

export default function UserProfile({showUserProfile, setShowUserProfile, currentUserId}) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userProfileImg, setuserProfileImg] = useState("");

  const getUserCurrentProfile = () => {
    const user = {
      userId: currentUserId,
    };
    // route to get user info
    axios
      .get("/currentUserProfile", user)
      .then((result)=> {
        console.log(result.data)
        setUserName(result.data.user.name)
        setUserEmail(result.data.user.email)
        setuserProfileImg(result.data.user.avatar)
      }) 
      .catch((error) => {
        console.log("Error message: ", error);
      });
  }

  const userNameChange = (e) => {
    setUserName(e.target.value);
  };

  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleAvatarUpload = () => {
    axios.get("/uploadAvatar")
  }

  const handleEditUserProfile = () => {

    const user = {
      userid: currentUserId,
      name: userName,
      email: userEmail,
      password: userPassword,
      avatar:userProfileImg,
    };

    // need route to edit user profile
    axios
      .put("/currentUserProfile", user)
      .then((result) => {
        if (result.data !== "Failed") {
          alert("Successfully Edited User Profile")
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
    getUserCurrentProfile()
  }, []);


  return (
    <div className="loginDiv d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column border p-2 align-items-center rounded">
        <h5>User Profile</h5>

        <div>
          <label>Upload profile picture</label>
          <input 
            type="file" 
            enctype="multipart/form-data"
            name="avatar"/>
        </div>
        <div>
          <input 
            type="submit" 
            onClick={handleAvatarUpload}
            value="Upload" />
        </div>

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
          value=""
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
      </div>
    </div>
  )
}
