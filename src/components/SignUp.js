import { useState, useRef } from 'react';
import zxcvbn from 'zxcvbn';
import UserPool from '../UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';




const SignUp = () => {
    const passwordInputRef = useRef(null);
    const passwordInputRef2 = useRef(null);
    const passStrengthRef = useRef(null);

    const tempUserData = {
        username: '',
        password: '',
        email: '',
        phone: '',
        firstName: '',
        lastName: ''
    };




    const [userData, setUserData] = useState(tempUserData)

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUserData({...userData, [name]: value})
    }
    const handleAddressChange = (event) => {
        const {name, value} = event.target
        setUserData({...userData.address, [name]: value})
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        let attributeList = [];
        attributeList.push( new CognitoUserAttribute({Name : 'email',Value : userData.email}))
        attributeList.push( new CognitoUserAttribute({Name : 'phone_number',Value : "+1" + userData.phone}))
        //attributeList.push( new CognitoUserAttribute({Name : 'custom:firstName',Value : userData.firstName}))
        //attributeList.push( new CognitoUserAttribute({Name : 'custom:lastName',Value : userData.lastName}))
        
        await changePassword()
        setTimeout(()=>{},1000)
        UserPool.signUp(userData.username, userData.password, attributeList, null, (err, data) => {
          if(err){
            console.error(err);
          }
          console.log(data);
        });

    };

    const  changePassword = async() => {
        const newPassword = passwordInputRef.current.value;
        const newPassword2 = passwordInputRef2.current.value;
        
        if (newPassword === newPassword2 && newPassword !== "") { // If the passwords match
          
    
          setUserData((userData) => ({
            ...userData,
            password: newPassword,
          }));
        }
      };
    
      const handlePasswordStrength = (event) => {
        const password = event.target.value; // Get the new value from the input field
        console.log("Value = ", password);
    
        passStrengthRef.current.textContent = "";
    
        if(password === "") return;
     
        if (password.length <= 7) {
          passStrengthRef.current.textContent = "Password is too short";
        }
        else if (zxcvbn(password).score < 3) {
          passStrengthRef.current.textContent = "Password is weak";
        }
        else {
          passStrengthRef.current.textContent = "Password is good";
        }
      };


    return(
        <div>
            <h3>SignUp:</h3>
                <form  onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>&nbsp;
                        <input
                            type='username'
                            name='username'
                            required
                            value={userData.username}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label>Email:</label>&nbsp;
                        <input 
                            type='email'
                            name='email'
                            required
                            value={userData.email}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label>Phone:</label>&nbsp;
                        <input
                            type='phone'
                            name='phone'
                            value={userData.phone}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label>First Name:</label>&nbsp;
                        <input
                            type='firstName'
                            name='firstName'
                            value={userData.firstName}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label>Last Name:</label>&nbsp;
                        <input
                            type='lastName'
                            name='lastName'
                            value={userData.lastName}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <div className="password-container">
                            <label>Enter Password:</label>&nbsp;
                            <input 
                            type="password" 
                            size = "22"
                            required
                            ref={passwordInputRef} 
                            onChange={handlePasswordStrength}
                            />
                            <br/>
                            <label>Confirm Password:</label>&nbsp;
                            <input 
                            type="password" 
                            size="22"
                            required
                            ref={passwordInputRef2} 
                            />
                            </div>
                            <p ref={passStrengthRef} className="password-strength"></p>
                    </div>
                    

                    <button type='submit'>Create Account</button>

                </form>
        </div>
    );
}


export default SignUp



