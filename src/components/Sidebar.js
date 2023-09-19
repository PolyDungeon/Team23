import React, { useState } from 'react';

const Sidebar = ({ onAddProduct }) => {
    const [isAddButtonVisible, setAddButtonVisible] = useState(false);

    const toggleAddButton = () => {
        setAddButtonVisible(!isAddButtonVisible);
    };

    return (
        <div className="sidebar">
            {isAddButtonVisible && (
                <button
                    className="btn btn-primary btn-block"
                    onClick={onAddProduct}
                >
                    Add Product
                </button>
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
