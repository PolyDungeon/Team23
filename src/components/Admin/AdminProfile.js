import React from 'react';
import { Link } from 'react-router-dom';
import "./admin.css"
import { userData } from '../UserData';

const AdminProfile = () => {
 
        return(
        
        <div className="page">
            
            <div className="profile">
                <h3>Profile</h3>
                <p className='info'>
                    Name: {userData.name} <br/>
                    Email: {userData.email} <br/>
                    Phone: {userData.phone} <br/>
                </p>

                <button>
                    Reset Password
                </button>
            </div>
            <div className="tools">
                <h3>Admin Tools</h3>
                <div className='box'>
                    <Link to="/admin/reports">
                        Reports
                    </Link>
                </div>
                <div className='box'>
                    <Link to="/admin/create/admin">
                        Create Admin
                    </Link>
                </div>
                <div className='box'>
                    <Link to="/admin/create/sponsororg">
                        Create Sponsor Organization
                    </Link>
                </div>
            </div>
        </div>
        )
} 
export default AdminProfile;