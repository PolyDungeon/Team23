import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { createAuditLog } from './AuditLogging';
import { userData, updateUserData, logoutUser } from './UserData';
import styled from 'styled-components'







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
  const userUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'
  const handleSaveChanges = () => {
    setIsEditing(false);

    updateUserData(uData)
    sessionStorage.setItem('user', JSON.stringify(userData))


    fetch(userUrl, {
      method:'PATCH',
      body:JSON.stringify(userData)
      }).then(response => {
        if(!response.ok){
          console.log("Updated user.")
        }
      })


    setuData((prevuData) => ({
      ...prevuData,
      isEditing: false,
    }));
  };


  const handleChange = (event) => {
    const { name, value, className } = event.target;
    if(className != 'address'){
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

const loadSponsors = () =>{
  setSponsors([])
  document.getElementById('driverSponsors').innerHTML = ''
  const headRow = document.createElement('tr') 
  headRow.style.border = "1px solid black"
  headRow.style.padding = "10px"
  headRow.style.width = "25%"
  headRow.style.alignSelf = 'center'
  const headUsername = document.createElement('th')
  headUsername.textContent = 'Sponsor'
  headUsername.style.borderRight = "1px solid black"
  headRow.appendChild(headUsername)

  if(userData.type === 'driver'){
    const headReason = document.createElement('th')
    headReason.textContent = 'Points'
    headRow.appendChild(headReason)
  }
  document.getElementById("driverSponsors").appendChild(headRow)
  for(var i = 0; i < uData.sponsorList.length; i++){
    fetch(orgUrl + "/" + uData.sponsorList[i].sponsor, {
      method: 'GET'
    }).then(foundOrg => {
      foundOrg.json().then(sponsor =>{
        console.log(sponsor)
        setSponsors([...sponsors, sponsor])
        showSponsors(sponsor, i)
      })
    })
  }
    
  
}

const showSponsors = (spon, i) =>{
  const sponItem = document.createElement('tr')
  sponItem.style.border = "1px solid black"
  sponItem.style.padding = "10px"
  sponItem.style.width = "25%"
  sponItem.style.alignSelf = 'center'
  const sponName = document.createElement('td')
  sponName.textContent = spon.name
  sponName.style.borderRight = "1px solid black"
  sponItem.appendChild(sponName)

  if (userData.type === 'driver'){
    const sponPoints = document.createElement('td')
    console.log(i)
    console.log(userData.sponsorList)
    sponPoints.textContent = `${userData.sponsorList[i-1].points}`
    sponItem.appendChild(sponPoints)
  }
  document.getElementById("driverSponsors").appendChild(sponItem)
}
  

  return (
    
    <div id="profile-container">
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
              className='address'
              value={uData.address.line1}
              placeholder='Enter first line of address...'
              onChange={handleChange}
            />
          </div>
          <div> Line2: &nbsp;
          <input
            type='address'
            name='line2'
            className='address'
            placeholder='Enter second line of address...'
            value={uData.address.line2}
            onChange={handleChange}
          />
        </div>
        <div> City: &nbsp;
          <input
            type='address'
            name='city'
            className='address'
            placeholder='Enter city...'
            value={uData.address.city}
            onChange={handleChange}
          />
        </div>
        <div> State: &nbsp;
          <input
            type='address'
            name='state'
            className='address'
            placeholder='Enter state...'
            value={uData.address.state}
            onChange={handleChange}
          />
        </div>
        <div> Zip: &nbsp;
          <input
            type='address'
            className='address'
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
          <button onClick={loadSponsors}>Sponsors</button><br/>
            <SponTable id='driverSponsors'/> 
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
      </div>
    </div>
  );
}

export default Profile;

const SponTable = styled.table`
{
    width: 50%;
    padding: 0rem 3rem;
    margin: 5px;
    border: 1px solid black;
    align-self: center;
}
`;