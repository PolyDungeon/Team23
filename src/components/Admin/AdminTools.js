import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AdminTools extends Component{
    render(){

        return(
        <div className="content">
        <h1>Admin Tools</h1>
        <Link to="/admin/reports" className='nav-link'>
            Reports
        </Link>
        </div>
        )
    }


}