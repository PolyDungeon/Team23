import React from "react";


var user = ''

export function updateDriverData(userinfo){
    user = userinfo
}



const DriverPage = () => {
    return(
        <div>
            <h3>Hello! {user.username}</h3>
        </div>
    )
}

export default DriverPage;