import React, { useState } from 'react';
import { createAuditLog } from '../Functions';



const DriverApp = () => {
    // Define the initial state for the questionnaire
    const initialFormData = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phone: '',
        userType: 'Trucker', // Default to Trucker
        organization: '', 
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
        createAuditLog('driverAppSubmit', formData.organization, formData.userName, 0, null, 'success', null)
        //put calls to the database here. 


        setSubmissionMessage('Data submitted successfully!');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div>
                <div className=
                    "text-capitalize text-center ">
                    <h1>Driver Application</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>&nbsp;
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>&nbsp;
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>User Name:</label>&nbsp;
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>&nbsp;
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Phone Number:</label>&nbsp;
                        <input
                            type="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Sponsor:</label>&nbsp;
                        <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className=
                        "text-capitalize text-center ">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                {submissionMessage && <p>{submissionMessage}</p>}
            </div>
        </div>
            );
};

export default DriverApp;
