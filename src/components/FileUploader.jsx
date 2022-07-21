import React from 'react';
import axios from 'axios';

export const FileUploader = ({selectedFile,setSelectedFile,setuserProfileImg,setAvatar}) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("avatar", selectedFile);
      axios
        .post("/uploadAvatar",formData,{
        headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data.result.Location);
          setAvatar(response.data.result.Location)
        })
        .catch((error) => {
        console.log("Error message: ", error);
      });
  }

  const handleRemoveAvatar = (event) => {
      event.preventDefault()
      setuserProfileImg("")
  }
        

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <>
     <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect}/>
        <br/>
        <input type="submit" value="Upload File"/>
        <br/>
        </form>
      {/* <button onClick={handleRemoveAvatar}>Remove</button> */}
    </>
  )
};

