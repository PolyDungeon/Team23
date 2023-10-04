import React from 'react';
import Title from "./Title";
import { useState } from 'react';

const Profile = () => {
  // Initialize state for user data
  const [userData, setUserData] = useState({
    userID: 'df910ds92sdf', // Database unique identifier
    email: 'ExampleUser@yahoo.com', 
    password: 'password123',
    points: 100, // Replace with user's actual points
    newPassword: '',
    confirmNewPassword: '',
  });

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to handle password change
  const handleChangePassword = () => {
    // Add code to handle password change here
    // You can validate passwords and make API requests to update the password
    console.log('Password change submitted.');
  };

  // Function to handle username change
  const handleChangeUsername = () => {
    // Add code to handle username change here
    // You can make API requests to update the username
    console.log('Username change submitted.');
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <h2>User Information</h2>
        <p>
          Email: {userData.email}
        </p>
        <p>
          Points: {userData.points}
        </p>
      </div>
      <div>
        <h2>Change Password</h2>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={userData.newPassword}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={userData.confirmNewPassword}
          onChange={handleInputChange}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <div>
        <h2>Change Username</h2>
        <input
          type="text"
          name="newUsername"
          placeholder="New Username"
          value={userData.newUsername}
          onChange={handleInputChange}
        />
        <button onClick={handleChangeUsername}>Change Username</button>
      </div>
    </div>
  );
}

export default Profile;