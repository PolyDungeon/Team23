import React from 'react';
import {Link} from 'react-router-dom';
import CheckoutList from './CheckoutList';
import CheckoutItem from './CheckoutItem';
import { TruckerCatelog} from '../../context';
import { updateUserData } from '../UserData';
import { CurrentUser } from '../Login';
import {userData} from '../UserData';
import { Redirect } from 'react-router-dom';
const url = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/purchases'
const userURL = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'
const getUser = async () => {
    const response = await fetch(userURL + "/" + CurrentUser.id, {
        method: 'GET'
    })
    const result = await response.json()

    return result
}
export default function CartTotals({value}) 
{
   
    const { checkout} =value;
    const {cartSubTotal, cartTax, cartTotal,clearCart} = value;
    const user = sessionStorage.getItem('user')
    console.log(user)
    updateUserData(JSON.parse(user))
     const pushPurchase= async(value)=>{
        try {
            const temp = {
                'products': value,
                'userID': userData.userID
            }
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(temp)
            });
        
            if (response.ok) {
                //setSubmissionMessage('Data submitted successfully!');
            } else {
                console.error('Response Status:', response.status);
                console.error('Response Body:', await response.text());
               // setSubmissionMessage('Error submitting data');
            }
        } catch (error) {
            console.error('Error:', error);
         //   setSubmissionMessage('Error submitting data');
        }
    
    }
    
    const handlePurchase = async (event) => {
       // createAuditLog('pointChange', null, 'Name', cartTotal, null, 'spent', null);
        <div className="container-fluid">
            {checkout.map(item=>{
            pushPurchase(item.title);
            return <CheckoutItem key={item.id} item={item} value={value}/>
            })
            } 
        </div>

        
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
                        <span className="text-title">subtotal : $</span>
                        <strong>{cartSubTotal}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">tax : $</span>
                        <strong>{cartTax}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">total : $</span>
                        <strong>{cartTotal}</strong>
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

