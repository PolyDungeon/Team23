import { Auth } from 'aws-amplify';
import { useState, useSyncExternalStore, useRef } from 'react';
import zxcvbn from 'zxcvbn';










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


    const handleSubmit = (event) => {
        event.preventDefault()
        changePassword()
        //signUp()

    };

    const changePassword = () => {
        const newPassword = passwordInputRef.current.value;
        const newPassword2 = passwordInputRef2.current.value;
        
        if (newPassword == newPassword2 && newPassword != "") { // If the passwords match
          
    
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
    
        if(password == "") return;
     
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

      /*
      async function signUp() {
        try {
          const { user } = await Auth.signUp({
            preferred_username: userData.username,
            password: userData.password,
            email: userData.email,
            attributes: {
              phone : userData.phone,
              firstName: userData.firstName,
              lastName: userData.lastName
            },
            autoSignIn: { // optional - enables auto sign in after user is confirmed
              enabled: true,
            }
          });
          console.log(user);
        } catch (error) {
          console.log('error signing up:', error);
        }
      }
      */
    

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



