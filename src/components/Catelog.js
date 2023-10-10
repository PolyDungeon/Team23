import React, { Component } from 'react';
import Product from "./Product";
import Title from "./Title";
import { TruckerCatelog } from '../context';
import Sidebar from './Sidebar'; // Import the Sidebar component

export default class Catelog  extends Component {
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
                                        isSidebarOpen={this.state.isSidebarOpen}
                                        toggleSidebar={this.toggleSidebar}
                                        onAddProduct={(newTitle, newImg, newPrice, newCompany) => {
                                            // Add a new product to the storeProducts array
                                            const newProduct = {
                                                id: value.products.length + 1, // Generate a unique ID
                                                title: "Cheese Kurds",
                                                img: "img/random.png", // Provide an image URL
                                                price: 1000, // Set the price
                                                company: "Polish Kurds",
                                                info: "",
                                                inCart: false,
                                                count: 0,
                                                total: 0,
                                            };
                                            value.addProduct(newProduct);
                                            
                                        }}
                                        />
                                    )}
                                            
                                </TruckerCatelog>
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
