import React from 'react';
import Title from "./Title";
import { useState, useRef } from 'react';
import { createAuditLog } from './AuditLogging';
import zxcvbn from 'zxcvbn';
import { userData, updateUserData, logoutUser } from './UserData';
import {notifyUpdate} from "./Notifications";







const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Initialize state for user data
  const [uData, setuData] = useState({
    ...userData,
    maskedPassword: '***********',
    newPassword: '',
    confirmNewPassword: '',
    isEditing: false,
  }); 

  window.onload = () => {
    setuData({...uData, ...userData})
    console.log()
  }
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
    updateUserData(uData)

    setuData((prevuData) => ({
      ...prevuData,
      isEditing: false,
    }));
  };

  const emailInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordInputRef2 = useRef(null);
  const passStrengthRef = useRef(null);

  const handleChange = (event) => {
    const { name, value, id } = event.target;
    console.log(id)
    if(id != 'address'){
      setuData({ ...uData, [name]: value });
    }else{
      setuData(uData =>(
        {...uData, 
          address: {...uData.address, [name]: value}
        }
        ))
    }
  }
  const changeEmail = () => {
    
    const newEmail = emailInputRef.current.value;
    setIsEditing(false);
    //console.log("changeEmail()", newEmail);
    // Check if newEmail is allowed
    if(newEmail !== "") {
      notifyUpdate("E-Mail", newEmail);
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
      notifyUpdate("UserName", newUsername);
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
      notifyUpdate("Password");

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
  var maskVersion = "*";
  uData.password.split('').forEach((char, index) => {
    //console.log(`Character ${char} at index ${index}`);
    maskVersion += "*";
  });
  //console.log("mask version is " + maskVersion);
  return maskVersion;
};

const loadSponsors = () =>{
  console.log("Loading")
}
  

  return (
    <div id="profile-container">
      <div id="profile-container2">
        <h1>My Profile</h1>
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
        <p>Name:  {uData.isEditing ? (
          <>
          <input
            type='firstName'
            name='firstName'
            size='22'
            value={uData.firstName}
            placeholder='Enter given name...'
            onChange={handleChange}
          />
          <input
            type='lastName'
            name='lastName'
            size='22'
            value={uData.lastName}
            placeholder='Enter surname...'
            onChange={handleChange}
          />
          </>
        ) : 
        <>{uData.firstName} {uData.lastName}</>
        }</p>

        <p>Email: {uData.isEditing ? (
          <>
            <input 
              type="email"
              size="22"
              ref={emailInputRef}
              name='email'
              value={uData.email}
              placeholder="Enter new email..." 
              required
              onChange={handleChange}>
              </input>
          </>
        ) : <>{uData.email}</>}</p>

        <p>Phone: {uData.isEditing ? (
          <input
            type='phone'
            name='phone'
            size='22'
            value={uData.phone}
            placeholder='Enter new phone number...'
            onChange={handleChange}/>
        ): <>{uData.phone}</>}</p>

        <p>Address: {uData.isEditing ? (
          <>
          <div> Line1: &nbsp;
            <input
              id='address'
              name='line1'
              value={uData.address.line1}
              placeholder='Enter first line of address...'
              onChange={handleChange}
            />
          </div>
          <div> Line2: &nbsp;
          <input
            id='address'
            name='line2'
            placeholder='Enter second line of address...'
            value={uData.address.line2}
            onChange={handleChange}
          />
        </div>
        <div> City: &nbsp;
          <input
            id='address'
            name='city'
            placeholder='Enter city...'
            value={uData.address.city}
            onChange={handleChange}
          />
        </div>
        <div> State: &nbsp;
          <input
            id='address'
            name='state'
            placeholder='Enter state...'
            value={uData.address.state}
            onChange={handleChange}
          />
        </div>
        <div> Zip: &nbsp;
          <input
            id='address'
            name='zip'
            placeholder='Enter zipcode...'
            value={uData.address.zip}
            onChange={handleChange}
          />
        </div>
        </>
        ):
        uData.address.line1 !== '' &&(
          <>
          {uData.address.line1} <br/> {uData.address.line2} <br/> {uData.address.city}, {uData.address.state} {uData.address.zip}
          </>
        )}
        </p>
        
        <div>
          <label>Sponsor: </label>&nbsp;
            {uData.type === 'sponsor' ?
            (<>{uData.sponsorList[0].sponsor}</>) : (
              <>
          
            <select
              id='sponsors'
            >
              <option>{uData.sponsorList[0].sponsor}</option>
            </select>
          <p>Driver Points: {uData.points}</p>
           </> )}
        </div>

        

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