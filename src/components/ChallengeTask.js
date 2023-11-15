import React, { useState } from 'react';
import { useContext } from 'react';

import { TruckerCatelog } from '../context';
import { userData } from '../UserData';

const ChallengeTask = ({ task, isEditMode, handleDeleteTask }) => {
    const [isComplete, setComplete] = useState(task.isComplete);
    const { addPoints } = useContext(TruckerCatelog);
    const { } = useContext(userData);


    const handleCompleteToggle = () => {
        // You can also update the task's complete status in your data here if needed.
        setComplete(!isComplete);
        addPoints(task.points);
    };


    return (
        
        <div className="task-container">
            <TruckerCatelog>
            <div className="task-details">
                <div className="task-pair">
                    <h3>Name:</h3>
                    <p>{task.name}</p>
                </div>
                <div className="task-pair">
                    <h3>Description:</h3>
                    <p>{task.description}</p>
                </div>
                <div className="task-pair">
                    <h3>Points:</h3>
                    <p>{task.points}</p>
                </div>
                <div className="task-pair">
                    <div className="task-completed">
                        <h3>Is Complete:</h3>
                        <p>{isComplete ? "Completed" : "Incomplete"}</p>
                    </div>   
                </div>
                <button onClick={handleCompleteToggle}>
                    {isComplete ? "Mark Incomplete" : "Mark Complete"}
                </button>

            </div>
            {isEditMode && ( // Render delete button when in edit mode
                <button onClick={handleDeleteTask}>Delete</button>
                )}
            </TruckerCatelog>
        </div>
    );
};

export default ChallengeTask;
