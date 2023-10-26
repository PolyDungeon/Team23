import React, { Component} from 'react';


const userData = {
    userID: '',
    email: '',
    userName: '',
    type: 'admin',
    
}




export default class createAdmin extends Component{
    render(){

        return(
            
        <div className="content">
        
        <h1>Create an Admin User</h1>
        

        <p>Email:  
            <input
                type="email"
                name="adminEmail"
                placeholder="example@email.com"
            />
        </p>
        <p>Temporary Password:
            <input
                type="password"
                name="adminTempPassword"
                placeholder="Enter Password"
            />
        </p>
        <p>Confirm Password:
            <input
                type="password"
                name="adminTempPassword"
                placeholder="Enter Password"
            />
        </p>

        <div>
            <label>Set Permissions</label>
            <input
                type="checkbox"
            />
        </div>
        
        <button>Create New Account</button>

        </div>
        )
    }
}