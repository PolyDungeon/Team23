import React, { Component } from 'react'
import styled from 'styled-components';
import {TruckerCatelog} from '../context';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';

export default class Popup extends Component {
    render() {
        return (
            <TruckerCatelog>
                {(value)=>{
                    const {PopupOpen,closePopup} =value;
                    const {img, title,price} = value.PopupProduct;
                    if(!PopupOpen){
                        return null;
                    }else{
                        return (
                            < PopupContainer >
                            <div className="container">
                                <div className="row">
                                    <div id="Popup" className=
                                    "col-8 mx-auto col-md-6 col-lg-4 text-capitalize text-center p-5">
                                    <h5>item added to the cart</h5>
                                    <img src={img} className="img-fluid" alt="product" />
                                    <h5>{title}</h5>
                                    <h5 className="text-muted">price : $ {price}</h5>
                                    <Link to='/'>
                                    <ButtonContainer onClick={()=>closePopup()}>
                                        continue shopiing
                                    </ButtonContainer>
                                    </Link>
                                    <Link to='/checkout'>
                                    <ButtonContainer cart onClick={() => closePopup()}>
                                         checkout
                                    </ButtonContainer>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </PopupContainer>
                        );
            }
                
        }}
            </TruckerCatelog>
        );
    }
}
const PopupContainer =styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0,0,0,0.3);
display:flex;
align-items:center;
justify-content:center;
#Popup{
    background:var(--mainWhite);
}
`;