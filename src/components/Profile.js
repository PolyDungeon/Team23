import React, { useEffect } from 'react';
import Title from "./Title";
import { useState, useRef } from 'react';
import { createAuditLog } from './AuditLogging';
import zxcvbn from 'zxcvbn';
import { userData, updateUserData, logoutUser } from './UserData';







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

    updateUserData(uData)

    setuData((prevuData) => ({
      ...prevuData,
      isEditing: false,
    }));
  };


  const passwordInputRef = useRef(null);
  const passwordInputRef2 = useRef(null);
  const passStrengthRef = useRef(null);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if(type != 'address'){
      setuData({ ...uData, [name]: value });
    }else{
      setuData(uData =>(
        {...uData, 
          address: {...uData.address, [name]: value}
        }
        ))
    }
  }


const [sponsors,setSponsors] = useState([])
const orgUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/orgs'

const loadSponsors = async () =>{
  for(var i = 0; i < uData.sponsorList.length; i++){
    await fetch(orgUrl+ uData.sponsorList[i].sponsor, {
      method: 'GET'
    }).then(foundOrg => {
      const sponsor = foundOrg.json()
      setSponsors(...sponsors, sponsor)
    })
  }
}
  

  return (
    
    <div id="profile-container">
      <script> loadSponsors()</script>
      <div id="profile-container2">
        <h1>My Profile</h1>
        <p>Username: {uData.isEditing ? (
          <>
            <input 
              type="username" 
              size="22"
              name='username'
              value={uData.username}
              onChange={handleChange}
              placeholder="Enter new username..." >
              </input>
          </>
        ) : (<> {uData.username} </>)}</p>
        <p>Name:  {uData.isEditing ? (
          <>
          <input
            type='text'
            name='firstName'
            size='22'
            value={uData.firstName}
            placeholder='Enter given name...'
            onChange={handleChange}
          />
          <input
            type='text'
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
            type='text'
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
              type='address'
              name='line1'
              value={uData.address.line1}
              placeholder='Enter first line of address...'
              onChange={handleChange}
            />
          </div>
          <div> Line2: &nbsp;
          <input
            type='address'
            name='line2'
            placeholder='Enter second line of address...'
            value={uData.address.line2}
            onChange={handleChange}
          />
        </div>
        <div> City: &nbsp;
          <input
            type='address'
            name='city'
            placeholder='Enter city...'
            value={uData.address.city}
            onChange={handleChange}
          />
        </div>
        <div> State: &nbsp;
          <input
            type='address'
            name='state'
            placeholder='Enter state...'
            value={uData.address.state}
            onChange={handleChange}
          />
        </div>
        <div> Zip: &nbsp;
          <input
            type='address'
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
            (<>{sponsors[0]}</>
            ) : (
              <>
          
            <select
              id='sponsors'
            >
              <option>{uData.sponsorList[0].sponsor}</option>
            </select>
          <p>Driver Points: {uData.points}</p>
           </> )}
        </div>
        
        
        {uData.isEditing ? (
          <>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSaveChanges}>Save Changes</button>
          </>
        ) : (
          <>
          <button onClick={()=>{
            window.history.pushState(null, '',"./changePassword")
            window.history.go()
          }}>Change Password</button>
          <button onClick={handleEdit}>Edit</button>
          </>
        )}

      {console.log("RENDERING")}
      </div>

    </div>
  );
}

export default Profile;