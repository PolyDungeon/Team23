import React, { Component } from 'react';
import Product from "./Product";
import Title from "./Title";
import { TruckerCatelog } from '../context';
import Sidebar from './Sidebar'; // Import the Sidebar component
import { userData } from './UserData';

export default class Catelog extends Component {
    state = {
        isSidebarOpen: false, // Initially, the sidebar is closed
    };

    toggleSidebar = () => {
        this.setState(prevState => ({
            isSidebarOpen: !prevState.isSidebarOpen,
        }));
    };


    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            {/* Render the sidebar */}
                            <div className={`col-2 ${this.state.isSidebarOpen ? 'open' : ''}`}>
                                <TruckerCatelog>
                                    {value => (
                                        <Sidebar
                                            isChallengesPage={false}
                                            isSidebarOpen={this.state.isSidebarOpen}
                                            toggleSidebar={this.toggleSidebar}
                                        />
                                    )}
                                </TruckerCatelog>


                                {userData.loggedIn === true && userData.type !== 'driver' && userData.type !== '' &&  
                                    <TruckerCatelog>
                                        {value => (
                                            <Sidebar
                                                isSidebarOpen={this.state.isSidebarOpen}
                                                toggleSidebar={this.toggleSidebar}
                                            />
                                        )}
                                    </TruckerCatelog>
                                }
                            </div>
                            <div className="text-capitalize text-center col-15 content">
                                <Title name="" title="Catelog" />
                            </div>
                            <div className="col-10 content">
                                {/* Rest of your content */}
                                <div className="row">
                                    <TruckerCatelog>
                                        {value => {
                                            return value.products.map(product => (
                                                <Product key={product.id} product={product} />
                                            ));
                                        }}
                                    </TruckerCatelog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
