import React, { useState } from 'react';

const ChallengeTask = ({ task, isEditMode, handleDeleteTask }) => {
    const [isComplete, setComplete] = useState(task.isComplete);

    const handleCompleteToggle = () => {
        setComplete(!isComplete);
        // You can also update the task's complete status in your data here if needed.
    };


    return (
        <div className="task-container">
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
        </div>
    );
};

export default ChallengeTask;
