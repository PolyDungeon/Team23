
import {userData} from '../UserData';
import React,{ useState, useEffect} from 'react'
import { CurrentUser } from '../Login';
import { updateUserData } from '../UserData';
const url = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/purchases'
const userURL = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'
const PurchaseHistory =  () => {
    const [data, setData] = useState({
        products:[]
    });
    const user = sessionStorage.getItem('user')
    console.log(user)
    updateUserData(JSON.parse(user))
    console.log(userData.userID)
    useEffect(() => {
        getPurchases()
    }, [])
    const getPurchases = async () => {
        const response = await fetch(url + "/" + userData.userID, {
            method: 'GET'
        })
        const result = await response.json()
        setData({products: result.purchases})
        console.log(result)
        return data
    }
    useEffect(() => {
        getPurchases()
    }, [])
    console.log(data.products)
    return (
        
           
        <div className="content">
                
        <h1>Purchase History </h1>
            <p >You have Purchased: {data.products}</p>
</div>
    )
        }
export default PurchaseHistory;