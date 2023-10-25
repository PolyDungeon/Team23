import React from 'react';
import Title from "./Title";
import { useState, useRef } from 'react';
import zxcvbn from 'zxcvbn';

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
  const passStrengthRef = useRef(null);


  const changeEmail = () => {
    const newEmail = emailInputRef.current.value;
    console.log("changeEmail()", newEmail);
    // Check if newEmail is allowed
    if(newEmail !== "") {
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
    if(newUsername !== "") {
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
    
    if (newPassword === newPassword2 && newPassword !== "") { // If the passwords match
      console.log(newPassword);

      setUserData((prevUserData) => ({
        ...prevUserData,
        password: newPassword,
      }));
    }
  };

  const handlePasswordStrength = (event) => {
    const password = event.target.value; // Get the new value from the input field
    console.log("Value = ", password);

    passStrengthRef.current.textContent = "";

    if(password === "") return;

    if (password.length <= 7) {
      passStrengthRef.current.textContent = "Password is too short";
    }
    else if (zxcvbn(password).score < 3) {
      passStrengthRef.current.textContent = "Password is weak";
    }
    else {
      passStrengthRef.current.textContent = "Password is good";
    }
  };



  return (
    <div id="profile-container">
      <h1>My Pofile</h1>
      <p>Email: {userData.email} {userData.isEditing ? (
        <>
          <input 
            type="email"
            size="22"
            ref={emailInputRef}
            placeholder="Enter new email..." 
            required
            onInvalid={(e) => {
              e.target.setCustomValidity('Please enter a valid email address.');
            }}
            onChange={(e) => {
              e.target.setCustomValidity('');
            }}>
            </input>
        </>
      ) : ('')}</p>
      <p>Username: {userData.username} {userData.isEditing ? (
        <>
          <input 
            type="username" 
            size="22"
            ref={usernameInputRef} 
            placeholder="Enter new username..." >
            </input>
        </>
      ) : ('')}</p>
      <div>Password: {userData.password} {userData.isEditing ? (
        <>
          <div className="password-container">
            <input 
              type="password" 
              size = "22"
              ref={passwordInputRef} 
              onChange={handlePasswordStrength}
              placeholder="Enter new password..." >
              </input>
            <input 
              type="password" 
              size="22"
              ref={passwordInputRef2} 
              placeholder="Reenter new password..." >
              </input>
            </div>
            <p ref={passStrengthRef} className="password-strength"></p>
        </>
      ) : ('')}</div>
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