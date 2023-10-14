import React, { useState} from 'react';
import { userData, updateType } from './UserData';
import { createAuditLog } from './Functions';

const Login = () => {
    const initialFormData = {
        userName: '',
        password: '',
        userType: ''
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
        createAuditLog('loginAttempt', null, formData.userName, 0, null, 'submitted', null)
        //put calls to the database here. 

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
                            name="userName"
                            required
                            value={formData.userName}
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