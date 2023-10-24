import React, { useState } from 'react';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';

const Sidebar = () => {
    const [isAddButtonVisible, setAddButtonVisible] = useState(false);

    const toggleAddButton = () => {
        setAddButtonVisible(!isAddButtonVisible);
    };

    return (
        <div className="sidebar">
            {isAddButtonVisible && (
                <Link to="/Products/FindItems" className="ml-auto">
                    <ButtonContainer>
                        product page
                    </ButtonContainer>
                </Link>
            )}
            <button
                className={`toggle-button ${isAddButtonVisible ? 'open' : ''}`}
                onClick={toggleAddButton}
            >
                Toggle Sidebar
            </button>
            {/* Add any other sidebar content or links here */}
        </div>
    );
}

export default Sidebar;
