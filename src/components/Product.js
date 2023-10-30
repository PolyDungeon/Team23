import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TruckerCatelog } from '../context';
import PropTypes from 'prop-types';
export default class Product extends Component {
    render() {
        const { id, title, img, price, inCart } = this.props.product;

        return (
            <ProductWrapper className="col-* mx-auto col-md-* col-lg-3 my-3">
                <div className="card">
                    <TruckerCatelog>
                        {value => (
                            <div className="img-container m-1" onClick={() => value.handleDetail(id)}>
                                <Link to="/details">
                                    <img src={img} alt="product" className="card-img-top standard-image" />
                                </Link>
                                <button
                                    className="cart-btn"
                                    disabled={inCart}
                                    onClick={() => {
                                        value.addToCart(id);
                                        value.openPopup(id);
                                    }}
                                >
                                    {inCart ? (
                                        <p className="text-capitalize mb-0">In Cart</p>
                                    ) : (
                                        <span>Add</span>
                                    )}
                                </button>
                                <div className="card-footer d-flex justify-content-between">
                                    <p className="align-self-center mb-0">
                                        {title.length > 20 ? `${title.slice(0, 20)}...` : title}
                                    </p>
                                    <h5 className="text-white font-italic mb-0">
                                        <span className="mr-1"></span>
                                        {value.convertToPoints(price)}
                                    </h5>
                                </div>
                            </div>

                        )}

                    </TruckerCatelog>

                    {/* Add a Remove button */}
                    <TruckerCatelog>
                        {value => (
                            <button
                                className="btn btn-danger btn-block"
                                onClick={() => {
                                    value.removeProduct(id); // Call the removeProduct function from context
                                }}
                            >
                                Remove
                            </button>
                        )}
                    </TruckerCatelog>
                </div>
            </ProductWrapper>
        );
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
}

const ProductWrapper =styled.div`
.card {
    border-color: transparent;
    transition: all 1s linear;
}

.card-footer {
    height: 80px; /* Set a fixed height for the card footer */
    background: rgba(200, 197, 197);
    border-top: transparent;
    transition: all is linear;
}

&:hover {
    .card {
        border: 0.04rem solid rgba(0, 0, 0, 0.2);
        box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }

    .card-footer {
        background: rgba(200, 197, 197);
    }
}

.standard-image {
    width: 200px; /* Set your preferred width */
    height: 200px; /* Set your preferred height */
    object-fit: contain; /* Maintain aspect ratio and crop as needed */
}

.img-container {
    position: relative;
    overflow: hidden;
}

.card-img-top {
    transition: all 1s linear;
}

.img-container:hover .card-img-top {
    transform: scale(1.2);
}

/* Fade in add to cart button */
.cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all is linear;
}

.img-container:hover .cart-btn {
    transform: translate(0, 0);
}

.cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
}

`;