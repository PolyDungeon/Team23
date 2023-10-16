import React from 'react';
import Title from "./Title";
import { useState, useRef } from 'react';

const Profile = () => {
  // Initialize state for user data
  const [userData, setUserData] = useState({
    email: 'ExampleUser@yahoo.com', 
    username: 'df910ds92sdf', // Database unique identifier
    password: 'password123',
    points: 100, // Replace with user's actual points
    newPassword: '',
    confirmNewPassword: '',
    isEditing: false,
  }); 

  const handleEdit = () => {
    console.log("handleEdit()");
    setUserData((prevUserData) => ({
      ...prevUserData,
      isEditing: true,
    }));
  };

  const handleCancel = () => {
    console.log("handleCancel()");
    setUserData((prevUserData) => ({
      ...prevUserData,
      isEditing: false,
    }));
  };

  const handleSaveChanges = () => {
    console.log("handleSaveChanges()");
    
    changeEmail();
    changeUsername();
    changePassword();

    

    setUserData((prevUserData) => ({
      ...prevUserData,
      isEditing: false,
    }));
  };

  const emailInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordInputRef2 = useRef(null);


  const changeEmail = () => {
    const newEmail = emailInputRef.current.value;
    console.log("changeEmail()", newEmail);
    // Check if newEmail is allowed
    if(newEmail != "") {
      setUserData((prevUserData) => ({
        ...prevUserData,
        email: newEmail,
      }));
    }
  };

  const changeUsername = () => {
    const newUsername = usernameInputRef.current.value;
    console.log("changeUsername()", newUsername);
    
    // Check if newUsername is allowed
    if(newUsername != "") {
      setUserData((prevUserData) => ({
        ...prevUserData,
        username: newUsername,
      }));
    }
  };

  const changePassword = () => {
    const newPassword = passwordInputRef.current.value;
    const newPassword2 = passwordInputRef2.current.value;

    console.log("changePassword()");
    
    if (newPassword == newPassword2 && newPassword != "") { // If the passwords match
      console.log(newPassword);

      setUserData((prevUserData) => ({
        ...prevUserData,
        password: newPassword,
      }));
    }
  };

  return (
    <div>
      <h1>My Pofile</h1>
      <p>Email: {userData.email} {userData.isEditing ? (
        <>
          <input 
            type="email"
            ref={emailInputRef}
            placeholder="Enter new email..." >
            </input>
        </>
      ) : ('')}</p>
      <p>Username: {userData.username} {userData.isEditing ? (
        <>
          <input 
            type="username" 
            ref={usernameInputRef} 
            placeholder="Enter new username..." >
            </input>
        </>
      ) : ('')}</p>
      <p>Password: {userData.password} {userData.isEditing ? (
        <>
          <input 
            type="password" 
            ref={passwordInputRef} 
            placeholder="Enter new password..." >
            </input>
          <input 
            type="password" 
            ref={passwordInputRef2} 
            placeholder="Reenter new password..." >
            </input>
        </>
      ) : ('')}</p>
      <p>Driver Points: {userData.points}</p>
      {userData.isEditing ? (
        <>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSaveChanges}>Save Changes</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}

    {console.log("RENDERING")}
    </div>
  );
}

export default Profile;