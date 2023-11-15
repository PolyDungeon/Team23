import React, { useState, useRef } from 'react'
import zxcvbn from 'zxcvbn';
import { createAuditLog } from './AuditLogging';
import { resetPassword } from './Authenticate';
import { userData } from './UserData';



const ChangePassword = () => {

    const [uData, setuData] = useState({
        maskedPassword: '***********',
        newPassword: '',
        confirmNewPassword: '',
      }); 

    const passwordInputRef = useRef(null);
    const passwordInputRef2 = useRef(null);
    const passStrengthRef = useRef(null);

    const changePassword = () => {
        const newPassword = passwordInputRef.current.value;
        const newPassword2 = passwordInputRef2.current.value;
    
        //console.log("changePassword()");
        
        if (newPassword === newPassword2 && newPassword !== "") { // If the passwords match
          //console.log(newPassword);
    
    
          // Make the change in the database
          resetPassword(userData.username)
          
        }
        else {
          if(!(newPassword == "" && newPassword2 == "")) {
            alert("Passwords do no match");
          }
          
        }
        
      };

    const handlePasswordStrength = (event) => {
        const password = event.target.value; // Get the new value from the input field
    
        passStrengthRef.current.textContent = "";
    
        if(password === "") return;
    
        if (password.length <= 7) {
          passStrengthRef.current.textContent = "Password is too short.";
          passStrengthRef.current.style.color = 'red';
        }
        else if (zxcvbn(password).score < 3) {
          passStrengthRef.current.textContent = "Password is weak.";
          passStrengthRef.current.style.color = 'yellow';
        }
        else {
          passStrengthRef.current.textContent = "Password is good!";
          passStrengthRef.current.style.color = 'green';
        }
      };

    return(
        <div>
            <div>
                <h3>Change Password</h3>          
            </div>

            
            <div className="password-container">
              <input 
                type="password" 
                size = "22"
                ref={passwordInputRef} 
                onChange={handlePasswordStrength}
                placeholder="Enter new password..." >
                </input>
              <input 
                type="password" 
                size="22"
                ref={passwordInputRef2} 
                placeholder="Reenter new password..." >
              </input>
              
              <p ref={passStrengthRef} className="password-strength"></p>
              </div>
              <button onClick={changePassword}>Submit</button>
          


        </div>
    )

}

export default ChangePassword;