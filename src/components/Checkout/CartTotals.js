import React from 'react';
import {Link} from 'react-router-dom';
import { createAuditLog } from '../AuditLogging';

export default function CartTotals({value}) {
    const {cartSubTotal, cartTax, cartTotal,clearCart} = value;

    const handlePurchase = (event) => {
        createAuditLog('pointChange', null, 'Name', cartTotal, null, 'spent', null)
    }


    return <React.Fragment>
       <div className="container">
           <div className="row">
               <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                    <Link to="/Checkout">
                        <button
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button"
                            onClick={() => {
                                clearCart();
                            }}>
                            clear cart
                        </button>
                    </Link>
                    <h5>
                        <span className="text-title">subtotal : </span>
                        <strong>{value.convertToPoints(cartSubTotal)}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">tax : </span>
                        <strong>{value.convertToPoints(cartTax)}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">total : </span>
                        <strong>{value.convertToPoints(cartTotal)}</strong>
                    </h5>
                    <button
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button"
                            onClick={handlePurchase}>
                            Purchase Items
                        </button>
               </div>
           </div>
       </div>

       </React.Fragment>;
    
}
