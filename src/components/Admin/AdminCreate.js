import React, {useRef, useState} from 'react';
import UserPool from '../../UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';



const AdminCreate = () =>{
    const responseMessage = useRef(null)
    const responsePassword = useRef(null)

    const url = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'

    const postUser = async () => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(uData)
        })
        return response
    }

    const [uData, setuData] = useState({
        userID: '',
        type: 'admin',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            zip: ''
        },
        sponsorList:[{
            sponsor: '',
            points: 0
        }],
        password: '!Password123',
        
    })
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if(uData.username.indexOf(' ') >= 0){
            responseMessage.current.textContent = "Username can't have space."
            return
        }

        uData.password = 'Tb123!' + uData.username

        let attributeList = [];
        attributeList.push( new CognitoUserAttribute({Name : 'email',Value : uData.email}))
        
        UserPool.signUp(uData.username, uData.password, attributeList, null, (err, data) => {
            if(err){
              console.error(err);
              responseMessage.current.textContent = err.message + '.'
              responsePassword.current.textContent = ''
            }else{
                console.log(data);
                uData.userID = data.userSub
                responseMessage.current.textContent = "Successfully created account " + uData.username + "."
                responsePassword.current.textContent = "Temporary Password is: " + uData.password

               const postResponse =  postUser()
            }
          });
    }
    
    const handleInputChange = (event) => {
        const {name,value} = event.target
        setuData({...uData, [name]: value})
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
                        value={uData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Username:</label>&nbsp;
                        <input
                            type='username'
                            name='username'
                            required
                            value={uData.username}
                            onChange={handleInputChange}
                        />
                </div>
                <div>
                    <label>User Type:</label>&nbsp;
                        <select
                            name='type'
                            value={uData.type}
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