import React, { useState} from 'react';
import { createAuditLog } from './AuditLogging';
import { authenticate } from './Authenticate';

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

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        authenticate(formData.username, formData.password)
        .then((data)=>{
            console.log(data)
            CurrentUser.id = data.accessToken.payload.sub
            console.log(CurrentUser.id)
            window.history.pushState({},null,'/')
            createAuditLog('loginAttempt', null, formData.username, 0, null, 'submitted', null) // Successful login
        }, (err)=>{
            createAuditLog('loginAttempt', null, formData.username, 0, null, 'failed', null) // Failed login
            console.log(err)
        })
        .catch(err=>console.log(err))
        setSubmissionMessage('Data submitted successfully!');
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