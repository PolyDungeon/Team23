import { CognitoUser } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import UserPool from "../UserPool";
import { updateUserData, userData } from "./UserData";


const RecoverPassword = () =>{
    
const [recoverInfo, setRecoverInfo] = useState({
    username: '',
    code: '',
    newPass: ''
})

const [verified, setVerified] = useState(false)
const [submissionMessage, setSubmissionMessage] = useState('')

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
            setSubmissionMessage('Verification Code Sent. Check your email.')
            setVerified(true)
        },
        onFailure: function(err) {
            setSubmissionMessage(err.message)
        }})

        
}

const setNewPassword = () =>{
    const cognitoUser = new CognitoUser({
        Username: recoverInfo.username,
        Pool: UserPool
    })

    cognitoUser.confirmPassword(recoverInfo.code,recoverInfo.newPass, {
        onFailure(err){
            setSubmissionMessage(err.message)
        },
        onSuccess(){
            setSubmissionMessage("Password Successfully Changed.")
            window.history.pushState(null, '',"./login")
            window.history.go()
        }
    })
}

return(
    <div>
        <h3>Recover Password</h3>

        {!verified && (
            <div>
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
            </div>
        )
        }
        {verified && (
            <div>
            <form>
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
                <button type="submit" onClick={setNewPassword}>Submit</button>
            </form>
            </div>
            )}

            {submissionMessage && (
                <p>{submissionMessage}</p>
            )}
            
    </div>
)}


export default RecoverPassword;