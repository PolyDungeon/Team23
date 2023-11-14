import React, { useRef, useState } from 'react';
import { createAuditLog } from '../AuditLogging';
import { v4 as uuidv4 } from 'uuid';
import { userData } from '../UserData';




const DriverApp = () => {

    const responseMessage = useRef(null)
    // Define the initial state for the questionnaire
    const initialFormData = {
        username: userData.username,
        email: userData.email,
        organization: '',
        reason: '',
        status: 'submitted',
        appID: ''
    };

    // Create state variables for the form data and submission message
    const [formData, setFormData] = useState(initialFormData);

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const appUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/applications'
    const orgUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/orgs'
    const userUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'

    const postApplication = async() => {
        const response = await fetch(appUrl, {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        return response
    }

    const getOrg = async() => {
        const response = await fetch(orgUrl + "?name=" + formData.organization, {
            method: 'GET'
        })
        const results = await response.json()

        return results
    } 

    const getUser = async() => {
        const response = await fetch(userUrl + "?username=" + formData.username, {
            method: 'GET'
        })
        const results = await response.json()

        return results
    }

    const getApp = async() => {
        const response = await fetch(appUrl + "?username=" + formData.username + "&org=" + formData.organization, {
            method: 'GET'
        })
        const results = await response.json()
        return results
    }

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        

        const id = uuidv4()

        formData.appID = id

        getOrg().then(foundOrg => {
            if(foundOrg.length === 0){
                responseMessage.current.textContent = "Organization not found."
                return
            }
            getUser().then(foundUser =>{
                if(foundUser.length === 0){
                    responseMessage.current.textContent = "User not found."
                    return
                }
                getApp().then(returnApp =>{
                    if(returnApp.length !== 0){
                        responseMessage.current.textContent = "User already applied to this organization."
                        return
                    }
                    postApplication().then(response =>{
                        if(!response.ok){
                            responseMessage.current.textContent = "Application failed to submit."
                            createAuditLog('driverApp', formData.organization, formData.username, 0, null, 'failed', "Application failed to submit.")
                            return
                        }
                        responseMessage.current.textContent = "Successfully submitted applicaiton."
                        createAuditLog('driverApp', formData.organization, formData.username, 0, null, 'submitted', formData.reason)
                    }
                    )
                })
            })
        })

        
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
