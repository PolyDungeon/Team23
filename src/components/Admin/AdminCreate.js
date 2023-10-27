import React, {useRef, useState} from 'react';
import UserPool from '../../UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';


const AdminCreate = () =>{
    const responseMessage = useRef(null)
    const responsePassword = useRef(null)

    const [userData, setUserData] = useState({
        email: '',
        username: '',
        password: '!Password123',
        type: ''
    })
    
    const handleSubmit = (event) => {
        event.preventDefault()

        if(userData.username.indexOf(' ') >= 0){
            responseMessage.current.textContent = "Username can't have space."
            return
        }

        userData.password = 'Tb123!' + userData.username

        let attributeList = [];
        attributeList.push( new CognitoUserAttribute({Name : 'email',Value : userData.email}))
        attributeList.push( new CognitoUserAttribute({Name : 'custom:type',Value : userData.type}))
        
        UserPool.signUp(userData.username, userData.password, attributeList, null, (err, data) => {
            if(err){
              console.error(err);
            }
            console.log(data);
          });


        responseMessage.current.textContent = "Successfully create account " + userData.username + "."
        responsePassword.current.textContent = "Password is: " + userData.password
    }
    
    const handleInputChange = (event) => {
        const {name,value} = event.target
        setUserData({...userData, [name]: value})
    }


        return(
        <div>
            <h3>Create a new User:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>&nbsp;
                    <input
                        type='email'
                        name='email'
                        required
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Username:</label>&nbsp;
                        <input
                            type='username'
                            name='username'
                            required
                            value={userData.username}
                            onChange={handleInputChange}
                        />
                </div>
                <div>
                    <label>User Type:</label>&nbsp;
                        <select
                            name='type'
                            value={userData.type}
                            onChange={handleInputChange}
                        >
                            <option value='admin'>Admin</option>
                            <option value='sponsor'>Sponsor</option>
                            <option value='driver'>Driver</option>
                        </select>
                </div>
                <button type='submit'>Create Account</button>
            </form>
            <div>
                <p ref={responseMessage} className='submit-response'></p>
                <p ref={responsePassword} className='submit-response'></p>
            </div>
        </div>    
        )
    
}

export default AdminCreate;