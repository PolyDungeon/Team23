import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import cart from '../Cart.svg';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import { userData } from './UserData';
import { CurrentUser } from './Login';




export default class Navbar extends Component {
    

    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-10">
                <Link to='/'>
                    <img src={logo} alt="store" className="navbar-brand" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className='nav-item'>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                    
                        <li className="nav-item">
                            <Link to="/catelog" className="nav-link">
                                Store
                            </Link>
                        </li>
                    
                    
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">
                                My Profile
                            </Link>
                        </li>
                    
                        <li className="nav-item">
                            <Link to="/notifications" className="nav-link">
                                Notifications
                            </Link>
                        </li>
                    
                        <li className="nav-item"> 
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/driver/signup" className="nav-link">
                                Apply
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sponsor/home" className="nav-link">
                                Sponsor
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">
                                SignUp
                            </Link>
                        </li>
                    
                    { userData.type === 'admin'  && (
                    <li className="nav-item">
                        <Link to="/admin/home" className="nav-link">
                            Admin
                        </Link>
                    </li>
                    )
                    }
                </ul>
                <div className='ml-auto' style={{padding: "8px", margin: "0px", textAlign: "right"}}>
                    <p style={{margin: "0px", fontWeight:"bold", fontSize: "larger"}}>
                        Your Current Points: {userData.points}
                    </p>
                </div>
                <Link to="/checkout" className="ml-auto">
                    <ButtonContainer>
                        <img src={cart} alt="My Cart" className="navbar-brand" />
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        )
    }
}



const NavWrapper = styled.nav`


background: rgba(255, 255, 255);
.nav-link {
    color: black !important;
    font-size: 1rem; /* Adjust the font size */
    text-transform: capitalize;
    padding: 0.5rem 1rem; /* Adjust the padding to shrink the size */
}

.navbar-brand {
    width: 100px; /* Adjust the width of the logo */
    height: 100px; /* Adjust the height of the logo */
    //border: 2px solid red;
}

.nav-item {
    //border: 2px solid black;
    //margin-right: 1%;
}
`;
