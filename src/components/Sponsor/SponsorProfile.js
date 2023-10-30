import React from 'react'
import { userData } from '../UserData';
import { Link } from 'react-router-dom'





const SponsorProfile = () => {
 
    return(
        
        <div class="page">
            
            <div class="profile">
                <h3>Profile</h3>
                <p class='info'>
                    Name: {userData.name} <br/>
                    Email: {userData.email} <br/>
                    Phone: {userData.phone} <br/>
                </p>
                <Link to= "/changePassword">
                <button>
                    Reset Password
                </button>
                </Link>
            </div>
            <div class="tools">
                <h3>Sponsor Tools</h3>
                <div class='box'>
                    <Link to="/sponsor/reports">
                        Reports
                    </Link>
                </div>
                <div class='box'>
                    <Link to="/sponsor/create">
                        Create Sponsor Account
                    </Link>
                </div>
            </div>
        </div>
        )




}

export default SponsorProfile;