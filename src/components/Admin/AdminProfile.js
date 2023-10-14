import React from 'react';
import { Link } from 'react-router-dom';
import "./admin.css"
import { userData } from '../UserData';

const AdminProfile = () => {
 
        return(
        
        <div class="page">
            
            <div class="profile">
                <h3>Profile</h3>
                <p class='info'>
                    Name: {userData.name} <br/>
                    Email: {userData.email} <br/>
                    Phone: {userData.phone} <br/>
                </p>

                <button>
                    Reset Password
                </button>
            </div>
            <div class="tools">
                <h3>Admin Tools</h3>
                <div class='box'>
                    <Link to="/admin/reports">
                        Reports
                    </Link>
                </div>
                <div class='box'>
                    <Link to="/admin/create/admin">
                        Create Admin
                    </Link>
                </div>
                <div class='box'>
                    <Link to="/admin/create/sponsororg">
                        Create Sponsor Organization
                    </Link>
                </div>
            </div>
        </div>
        )
} 
export default AdminProfile;