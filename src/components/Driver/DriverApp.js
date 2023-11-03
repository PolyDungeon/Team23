import React, { useRef, useState } from 'react';
import { createAuditLog } from '../AuditLogging';
import { v4 as uuidv4 } from 'uuid';




const DriverApp = () => {

    const responseMessage = useRef(null)
    // Define the initial state for the questionnaire
    const initialFormData = {
        username: '',
        email: '',
        organization: '',
        reason: '',
        appID: ''
    };

    // Create state variables for the form data and submission message
    const [formData, setFormData] = useState(initialFormData);
    const [submissionMessage, setSubmissionMessage] = useState('');

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const appUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/applications'

    const postApplication = async() => {
        const response = await fetch(appUrl, {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        return response
    }

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        createAuditLog('driverApp', formData.organization, formData.username, 0, null, 'submitted', null)

        const id = uuidv4()

        formData.appID = id

        
    
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
                        <label>User Name:</label>&nbsp;
                        <input
                            type="text"
                            name="username"
                            required
                            value={formData.username}
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
                        <label>Sponsor:</label>&nbsp;
                        <input
                            type="text"
                            name="organization"
                            required
                            value={formData.organization}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Reason:</label>&nbsp;
                        <br/>
                        <textarea
                            rows={3}
                            cols={50}
                            name='reason'
                            required
                            value={formData.reason}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className=
                        "text-capitalize text-center ">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <div>
                    <p ref={responseMessage}/>
                </div>
            </div>
        </div>
            );
};

export default DriverApp;
