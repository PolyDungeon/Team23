import React, { useState } from 'react';
import Title from "./Title";

const SignUp = () => {
    // Define the initial state for the questionnaire
    const initialFormData = {
        name: '',
        email: '',
        userType: 'Trucker', // Default to Trucker
        organization: '', // Empty for Trucker
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

        //put calls to the database here. 


        setSubmissionMessage('Data submitted successfully!');
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
