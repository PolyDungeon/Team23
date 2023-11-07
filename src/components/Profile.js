import React from 'react';
import Title from "./Title";
import { useState, useRef } from 'react';
import { createAuditLog } from './AuditLogging';
import zxcvbn from 'zxcvbn';




const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Initialize state for user data
  const [uData, setuData] = useState({
    email: 'ExampleUser@yahoo.com', 
    username: 'df910ds92sdf', // Database unique identifier
    password: 'password123',
    maskedPassword: '***********',
    points: 100, // Replace with user's actual points
    newPassword: '',
    confirmNewPassword: '',
    isEditing: false,
  }); 

  const handleEdit = () => {
    setIsEditing(true);
    //console.log("handleEdit()");
    setuData((prevuData) => ({
      ...prevuData,
      isEditing: true,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    //console.log("handleCancel()");
    setuData((prevuData) => ({
      ...prevuData,
      isEditing: false,
    }));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    //console.log("handleSaveChanges()");
    
    changeEmail();
    changeUsername();
    changePassword();

    
    //togglePasswordVisibility();
    

    setuData((prevuData) => ({
      ...prevuData,
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
    setIsEditing(false);
    //console.log("changeEmail()", newEmail);
    // Check if newEmail is allowed
    if(newEmail !== "") {
      setuData((prevuData) => ({
        ...prevuData,
        email: newEmail,
      }));


    // Make the change in the database

    createAuditLog('emailChange', null, uData.username, 0, null, 'submitted', null);
    }
    else {
      createAuditLog('emailChange', null, uData.username, 0, null, 'failed', null);
    }
  };

  const changeUsername = () => {
    const newUsername = usernameInputRef.current.value;
    //console.log("changeUsername()", newUsername);
    
    // Check if newUsername is allowed
    if(newUsername !== "") {
      setuData((prevuData) => ({
        ...prevuData,
        username: newUsername,
      }));


    // Make the change in the database

    createAuditLog('usernameChange', null, uData.username, 0, null, 'success', null);

    }
    else {
      createAuditLog('usernameChange', null, uData.username, 0, null, 'failed', null);
    }
  };

  const changePassword = () => {
    const newPassword = passwordInputRef.current.value;
    const newPassword2 = passwordInputRef2.current.value;

    //console.log("changePassword()");
    
    if (newPassword === newPassword2 && newPassword !== "") { // If the passwords match
      //console.log(newPassword);

      setuData((prevuData) => ({
        ...prevuData,
        password: newPassword,
        maskedPassword: getMaskedPass(),
      }));

      // Make the change in the database

      createAuditLog('passwordChange', null, uData.username, 0, null, 'success', null);
    }
    else {
      if(!(newPassword == "" && newPassword2 == "")) {
        alert("Passwords do no match");
        createAuditLog('passwordChange', null, uData.username, 0, null, 'failure', null);
      }
      
    }

    // Asynchronous issues
    /*var returnVal = togglePasswordVisibility();
    console.log("returnVal = " + returnVal);*/
    
  };

  const handlePasswordStrength = (event) => {
    const password = event.target.value; // Get the new value from the input field
    //console.log("Value = ", password);

    passStrengthRef.current.textContent = "";

    if(password === "") return;

    if (password.length <= 7) {
      passStrengthRef.current.textContent = "Password is too short.";
      passStrengthRef.current.style.color = 'red';
    }
    else if (zxcvbn(password).score < 3) {
      passStrengthRef.current.textContent = "Password is weak.";
      passStrengthRef.current.style.color = 'yellow';
    }
    else {
      passStrengthRef.current.textContent = "Password is good!";
      passStrengthRef.current.style.color = 'green';
    }
  };

const togglePasswordVisibility = (event) => {
  var btn = document.getElementById("showPassBtn");

  if(btn.textContent == "Show") {
    btn.textContent = "Hide";
    //Show the password
    setuData((prevuData) => ({
      ...prevuData,
      maskedPassword: uData.password,
    }));
  }
  else {
    btn.textContent = "Show";
    //hide password
    setuData((prevuData) => ({
      ...prevuData,
      maskedPassword: getMaskedPass(),
    }));
   
  }

  getMaskedPass();
};
  
const getMaskedPass = (event) => {
  var maskVersion = "";
  uData.password.split('').forEach((char, index) => {
    //console.log(`Character ${char} at index ${index}`);
    maskVersion += "*";
  });
  //console.log("mask version is " + maskVersion);
  return maskVersion;
};
  

  return (
    <div id="profile-container">
      <div id="profile-container2">
        <h1>My Pofile</h1>
        <div>Email: {uData.email} {uData.isEditing ? (
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
        ) : ('')}</div>
        <p>Username: {uData.username} {uData.isEditing ? (
          <>
            <input 
              type="username" 
              size="22"
              ref={usernameInputRef} 
              placeholder="Enter new username..." >
              </input>
          </>
        ) : ('')}</p>
        <div id="pass">Password: {uData.maskedPassword} <button id="showPassBtn" onClick={togglePasswordVisibility}>Show</button> {uData.isEditing ? (
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
              
              <p ref={passStrengthRef} className="password-strength"></p>
              </div>
          </>
        ) : ('')}</div>
        <p>Driver Points: {uData.points}</p>
        {uData.isEditing ? (
          <>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSaveChanges}>Save Changes</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}

      {console.log("RENDERING")}
      </div>

    </div>
  );
}

export default Profile;