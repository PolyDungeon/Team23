import React from 'react';
import { Link } from 'react-router-dom';
import "./admin.css"
import { userData } from '../UserData';
import UserPool from '../../UserPool';
import { CurrentUser } from '../Login';

const AdminProfile = () => {

        const user = UserPool.getCurrentUser()

        user.getUserAttributes((err,result)=>{
            if(err){
                console.log(err)
            }
            console.log(result)
        })

        console.log(CurrentUser.id)


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
                    <Link to="/admin/create/user">
                        Create New User
                    </Link>
                </div>
                <div className='box'>
                    <Link to="/admin/create/sponsororg">
                        Create Sponsor Organization
                    </Link>
                </div>
                <div className='box'>
                    <Link to="/admin/update/user">
                        Update User Type
                    </Link>
                </div>
            </div>
        </div>
        )
} 
export default AdminProfile;