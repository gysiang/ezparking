import React, {useState,useEffect} from "react";
import axios from "axios";
import { FileUploader } from "./FileUploader.jsx";

export default function UserProfile({showUserProfile, setShowUserProfile, currentUserId}) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userProfileImg, setuserProfileImg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);


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

  const putUserAvatar = () => {
    const avatarImg = {
      avatar: userProfileImg
    }
    axios
      .put("/updateUserAvatar",avatarImg)
      .then((result)=>{
        console.log(result.data)
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

  useEffect(() => {
    console.log(userProfileImg)
    putUserAvatar()
  }, [userProfileImg]);


  return (
    <div className="loginDiv d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column border p-2 align-items-center rounded">
        <h5>User Profile</h5>
        <img src={userProfileImg} />
        <br/>
        <FileUploader 
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setuserProfileImg={setuserProfileImg}
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
      </div>
    </div>
  )
  }