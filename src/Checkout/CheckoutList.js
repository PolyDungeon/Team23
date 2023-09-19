import React from 'react';
import CheckoutItem from './CheckoutItem';

export default function CheckoutList({value}) {
    const { checkout} =value;
   
    return (
     <div className="container-fluid">
         {checkout.map(item=>{
             return <CheckoutItem key={item.id} item={item} value={value}/>
         })} 
        
    </div>
    );
}
