import React, {useState,useEffect} from "react";
import axios from "axios";
import { FileUploader } from "./FileUploader.jsx";

export default function UserProfile({setShowUserProfile,currentUserId,setuserName,setavatar }) {
  const [newUserName, setNewUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userProfileImg, setuserProfileImg] = useState(avatar);
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
        setNewUserName(result.data.user.name)
        setuserName(result.data.user.name)
        setUserEmail(result.data.user.email)
        setuserProfileImg(result.data.user.avatar)
        setavatar(result.data.user.avatar)
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
    setNewUserName(e.target.value);
  };

  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };


  const handleEditUserProfile = () => {

    const user = {
      name: newUserName,
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
    <div className="userProfileDiv d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column border p-2 align-items-center rounded">
        <h5>User Profile</h5>
        <img src={avatar} />
        <br/>
        <FileUploader 
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setuserProfileImg={setuserProfileImg}
        />
        <input
          type="text"
          value={newUserName}
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
            setShowUserProfile(false)
          }}
          className="form-control bg-info my-1"
        >
        Home
        </button>
      </div>
    </div>
  )
  }