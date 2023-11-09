import React, { useState } from 'react';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';

const Sidebar = ({ isChallengesPage, toggleSidebar, addNewChallenge, toggleEditChallenges }) => {
    const [toggleSideBar, setToggleSideBar] = useState(false);

    const toggleButton = () => {
        setToggleSideBar(!toggleSideBar);
    };

    const [showCreateChallengeForm, setShowCreateChallengeForm] = useState(false);
    const [challengeDetails, setChallengeDetails] = useState({
        name: '',
        description: '',
        points: '',
    });

    const toggleCreateChallengeForm = () => {
        setShowCreateChallengeForm(!showCreateChallengeForm);
    };

    const handleCreateChallenge = (e) => {
        e.preventDefault();

        // Create a new challenge object and pass it to the parent component
        const newChallenge = {
            name: challengeDetails.name,
            description: challengeDetails.description,
            points: challengeDetails.points,
            isComplete: false,
        };

        addNewChallenge(newChallenge);

        // Clear the form and hide it
        setChallengeDetails({
            name: '',
            description: '',
            points: '',
        });
        toggleCreateChallengeForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChallengeDetails({ ...challengeDetails, [name]: value });
    };

    return (
        <div className="sidebar">
            {isChallengesPage && toggleSideBar && (

                <ButtonContainer onClick={toggleCreateChallengeForm}>
                    Create Challenge
                </ButtonContainer>

            )}
            {isChallengesPage && toggleSideBar && (

                <ButtonContainer onClick={toggleEditChallenges}>
                    Edit Challenges
                </ButtonContainer>

            )}
            {!isChallengesPage && toggleSideBar && (
                <Link to="/Products/FindItems" className="ml-auto">
                    <ButtonContainer>Product Page</ButtonContainer>
                </Link>
            )}

            {showCreateChallengeForm && (
                <div className="create-challenge-form">
                    <form onSubmit={handleCreateChallenge}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Challenge Name"
                            value={challengeDetails.name}
                            onChange={handleChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Challenge Description"
                            value={challengeDetails.description}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="points"
                            placeholder="Points"
                            value={challengeDetails.points}
                            onChange={handleChange}
                        />
                        <button type="submit">Create</button>
                    </form>
                </div>
            )}

            <button
                className={`toggle-button ${toggleSideBar ? 'open' : ''}`}
                onClick={() => {
                    toggleButton();
                    toggleSidebar(); // Add this line to toggle the sidebar
                    setShowCreateChallengeForm(false);
                }}
            >
                Toggle Sidebar
            </button>


            {/* Add any other sidebar content or links here */}
        </div>
    );
};

export default Sidebar;
