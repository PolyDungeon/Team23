import React, { useState } from 'react';
import Title from "./Title";

const SignUp = () => {
    const url = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/items';
    // Define the initial state for the questionnaire
    const initialFormData = {
        name: '',
        email:'',
        userType:''
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(url, {
                headers: {
                    'content-type': 'application/json',
                  },
        
                method: 'PUT',
                body: JSON.stringify(formData)
            })
            if (response.ok) {
              setSubmissionMessage('Data submitted successfully!');
            } else {
              setSubmissionMessage('Error submitting data');
            }
          } catch (error) {
            console.error('Error:', error);
            setSubmissionMessage('Error submitting data');
          }
        };

        
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div>
                <div className=
                    "text-capitalize text-center ">
                    <Title name="" title="Sign Up" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>User Type:</label>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleInputChange}
                        >
                            <option value="pickUserType">Please Pick A User Type</option>
                            <option value="Trucker">Trucker</option>
                            <option value="Sponsor">Sponsor</option>
                        </select>
                    </div>
                    {formData.userType === 'Sponsor' && (
                        <div>
                            <label>Organization:</label>
                            <input
                                type="text"
                                name="organization"
                                value={formData.organization}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
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

export default SignUp;