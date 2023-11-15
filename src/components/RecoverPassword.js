import { CognitoUser } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import UserPool from "../UserPool";


const RecoverPassword = () =>{
    
const [recoverInfo, setRecoverInfo] = useState({
    username: '',
    code: '',
    newPass: ''
})

const [verified, setVerified] = useState(false)

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecoverInfo({ ...recoverInfo, [name]: value });
};

const sendRecoverCode = () =>{

    const cognitoUser = new CognitoUser({
        Username: recoverInfo.username,
        Pool: UserPool
    })

    cognitoUser.forgotPassword({
        onSuccess: function(result) {
            console.log('call result: ' + result);
        },
        onFailure: function(err) {
            alert(err);
        }})

        setVerified(true)
}

const setNewPassword = () =>{
    console.log('Setting new password.')
}

return(
    <div>
        <h3>Recover Password</h3>

        {!verified ? (
            <form onSubmit={sendRecoverCode}>
                <label>Username: </label>&nbsp;
                <input
                    type="username"
                    name="username"
                    required
                    value={recoverInfo.username}
                    onChange={handleInputChange}
                />
                <br/>
                <button type="submit">Send Verification</button>
            </form>
        ):(
            <form onSubmit={setNewPassword}>
                <div>
                    <label>Verification Code: </label>&nbsp;
                    <input
                        type="verification"
                        name="code"
                        required
                        value={recoverInfo.code}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>New Password: </label>&nbsp;
                    <input
                        type="password"
                        name="newPass"
                        required
                        value={recoverInfo.newPass}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        )}
        
        



    </div>
)}


export default RecoverPassword;