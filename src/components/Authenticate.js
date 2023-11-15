import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import {userData} from './UserData';

export const authenticate = (Email, Password) =>{
    return new Promise((resolve,reject)=>{
        const user= new CognitoUser({
            Username:Email,
            Pool:UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username:Email,
            Password
        });

        user.authenticateUser(authDetails,{
            onSuccess:(result)=>{
                console.log('login successful');
                resolve(result);
            },
            onFailure:(err)=>{
                console.log("login failed",err);
                reject(err)
            }
        });
    });
};

export const logout = () => {
    const user = UserPool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
}

export function resetPassword(username) {
    // const poolData = { UserPoolId: xxxx, ClientId: xxxx };
    // userPool is const userPool = new AWSCognito.CognitoUserPool(poolData);

    // setup cognitoUser first
    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: UserPool
    });

    // call forgotPassword on cognitoUser
    cognitoUser.forgotPassword({
        onSuccess: function(result) {
            console.log('call result: ' + result);
        },
        onFailure: function(err) {
            alert(err);
        },
        inputVerificationCode() { // this is optional, and likely won't be implemented as in AWS's example (i.e, prompt to get info)
            var verificationCode = prompt('Please input verification code ', '');
            var newPassword = prompt('Enter new password ', '');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
    });
}

// confirmPassword can be separately built out as follows...  
export function confirmPassword(username, verificationCode, newPassword) {
    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: UserPool
    });

    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onFailure(err) {
                reject(err);
            },
            onSuccess() {
                resolve();
            },
        });
    });
}