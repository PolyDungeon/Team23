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
                            <div className="img-container p-5" onClick={() => value.handleDetail(id)}>
                                <Link to="/details">
                                    <img src={img} alt="product" className="card-img-top" />
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
                            </div>
                        )}
                    </TruckerCatelog>
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                        <h5 className="text-white font-italic mb-0">
                            <span className="mr-1">$</span>
                            {price}
                        </h5>
                    </div>
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
.card{
    border-color:tranparent;
    transition:all 1s linear;
}
.card-footer{
    background:rgba(200, 197, 197);
    border-top:transparent;
    transition:all is linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background:rgba(200, 197, 197);;
    }
}
.img-container{
    position:relative;
    overflow:hidden;
}
.card-img-top{
     transition:all 1s linear;
}
.img-container:hover .card-img-top{
    transform:scale(1.2);
}
/* Fade in add to cart button*/
.cart-btn{
    position:absolute;
    bottom:0;
    right:0;
    padding:0.2rem 0.4rem;
    background:var(--lightBlue);
    color:var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5 rem 0 0 0;
    transform:translate(100%, 100%);
    transition:all is linear;
}
.img-container:hover .cart-btn{
    transform:translate(0, 0);
}
.cart-btn:hover{
    color:var(--mainBlue);
    cursor:pointer;
}
`;