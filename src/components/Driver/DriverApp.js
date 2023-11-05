import React, { useState } from 'react';
import { createAuditLog } from '../AuditLogging';




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
        createAuditLog('driverApplication', formData.organization, formData.userName, 0, null, 'submitted', null)

        // Sponsor will need to be able to accept/reject this application at a later point.
        // Should probably update sponsor selection to be a drop down of our sponsors in database.
        // There will be another 'createAuditLog' when that occurs which will change the status to either 'accept' or 'reject'

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
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>&nbsp;
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>User Name:</label>&nbsp;
                        <input
                            type="text"
                            name="userName"
                            required
                            value={formData.userName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>&nbsp;
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Phone Number:</label>&nbsp;
                        <input
                            type="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Sponsor:</label>&nbsp;
                        <input
                            type="text"
                            name="organization"
                            required
                            value={formData.organization}
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
};

export default DriverApp;
