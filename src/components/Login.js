import React, { useState} from 'react';
import { createAuditLog } from './AuditLogging';
import { authenticate } from './Authenticate';
import { updateUserData } from './UserData';
import { Link } from 'react-router-dom'


export var CurrentUser = {
    id: ''
}

const Login = () => {
    
    const initialFormData = {
        username: '',
        password: '',
        type: ''
    };

    // Create state variables for the form data and submission message
    const [formData, setFormData] = useState(initialFormData);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const userUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const getUser = async () => {
        const response = await fetch(userUrl + "/" + CurrentUser.id, {
            method: 'GET'
        })
        const result = await response.json()

        return result
    }

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        authenticate(formData.username, formData.password)
        .then((data)=>{
            CurrentUser.id = data.accessToken.payload.sub
            console.log(data.accessToken.payload)
            createAuditLog('loginAttempt', null, formData.username, 0, null, 'submitted', null) // Successful login
            getUser().then(foundUsers => {
                const user =  foundUsers
                const newUser = {
                    ...user,
                    password:formData.password
                }
                updateUserData(newUser)
                setSubmissionMessage('Data submitted successfully!');

                sessionStorage.setItem('user', JSON.stringify(newUser))
                window.history.pushState(null, '',"./home")
                window.history.go()
            })
            }
        , (err)=>{
            createAuditLog('loginAttempt', null, formData.username, 0, null, 'failed', null) // Failed login
            setSubmissionMessage(err.message)
            setFormData(initialFormData)
            console.log(err)
        })
        .catch(err=>console.log(err)) 
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div>
                <div className=
                    "text-capitalize text-center ">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>&nbsp;
                        <input
                            type="username"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>&nbsp;
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Link to="/signup"> Create New Account</Link>&emsp;
                        <Link to="/recoverPass">Forgot Password?</Link>
                    </div>
                    <div className=
                        "text-capitalize text-center ">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                {submissionMessage && (
                    <p>{submissionMessage}</p>
                    
                )}
            </div>
        </div>
            );
}
export default Login;