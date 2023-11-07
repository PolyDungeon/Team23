import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Title from "./Title";
import { TruckerCatelog } from '../context';
import ChallengeTask from './ChallengeTask';

export default class Challenges extends Component {


    state = {
        challenges: [
            // Add more tasks as needed
        ],
        isSidebarOpen: false,
        isEditMode: false, // Initialize edit mode to false
    };

    handleDeleteTask = (index) => {
        this.setState((prevState) => {
            const updatedChallenges = prevState.challenges.filter((_, i) => i !== index);
            return { challenges: updatedChallenges };
        });
    };

    toggleSidebar = () => {
        this.setState(prevState => ({
            isSidebarOpen: !prevState.isSidebarOpen,
        }));
    };

    // Function to add a new challenge to the challenges list
    addNewChallenge = (newChallenge) => {
        this.setState((prevState) => ({
            challenges: [...prevState.challenges, newChallenge],
        }));
    };

    toggleEditMode = () => {
        this.setState((prevState) => ({
            isEditMode: !prevState.isEditMode,
        }));
    };

    render() {
        const isChallengesPage = true; // Change this condition accordingly

        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className={`col-2 ${this.state.isSidebarOpen ? 'open' : ''}`}>
                                <Sidebar
                                    isChallengesPage={isChallengesPage}
                                    toggleSidebar={this.toggleSidebar}
                                    addNewChallenge={this.addNewChallenge} // Pass the function to add a new challenge
                                    toggleEditChallenges={this.toggleEditMode}
                                />
                            </div>
                            <div className="text-capitalize text-center col-15 content">
                                <Title name="" title="Challenges" />
                            </div>
                            <div className="col-10 content">
                                <div>
                                    {this.state.challenges.map((task, index) => (
                                        <ChallengeTask
                                            key={index}
                                            task={task}
                                            isEditMode={this.state.isEditMode}
                                        />
                                    ))}
                                </div>

                                {/* Rest of your content */}
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
