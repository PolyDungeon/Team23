import { useState, useRef } from 'react';
import zxcvbn from 'zxcvbn';
import UserPool from '../UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';





const SignUp = () => {
    const passStrengthRef = useRef(null);
    const responseMessage = useRef(null);

    const tempuData = {
      userID: '',
      type: 'driver',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          zip: ''
      },
      sponsorList:[{
          sponsor: '',
          points: 0
      }],
      password: '',
      conpassword: ''
      
  };

  const url = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'
  const postUser = async () => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(uData)
    })
    return response
}

    const [uData, setuData] = useState(tempuData)

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setuData({...uData, [name]: value})
    }

    const handleSubmit =  (event) => {
      event.preventDefault()

      if(uData.password === uData.password){
        let attributeList = [];
        attributeList.push( new CognitoUserAttribute({Name : 'email',Value : uData.email}))
        attributeList.push( new CognitoUserAttribute({Name : 'phone_number',Value : "+1" + uData.phone}))
        attributeList.push( new CognitoUserAttribute({Name : 'given_name',Value : uData.firstName}))
        attributeList.push( new CognitoUserAttribute({Name : 'family_name',Value : uData.lastName}))
        
        
        UserPool.signUp(uData.username, uData.password, attributeList, null, (err, data) => {
          if(err){
            console.error(err);
            responseMessage.current.textContent = err.message + '.'
          }else{
            console.log(data);
            uData.userID = data.userSub
            responseMessage.current.textContent = "Successfully created account " + uData.username + "."

            const postResponse = postUser()

            setuData(tempuData)

            window.history.pushState(null,"","./login")
            window.history.go()
          }
        })
      }else{
        console.error("Password does not work.")
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

    const handlePassChange = (event) =>{
      handlePasswordStrength(event)
      handleInputChange(event)
    }


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
                            value={uData.username}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label>Email:</label>&nbsp;
                        <input 
                            type='email'
                            name='email'
                            required
                            value={uData.email}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label>Phone:</label>&nbsp;
                        <input
                            type='phone'
                            name='phone'
                            value={uData.phone}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label>First Name:</label>&nbsp;
                        <input
                            type='firstName'
                            name='firstName'
                            value={uData.firstName}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label>Last Name:</label>&nbsp;
                        <input
                            type='lastName'
                            name='lastName'
                            value={uData.lastName}
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
                            name='password'
                            value={uData.password}
                            onChange={handlePassChange}
                            />
                            <br/>
                            <label>Confirm Password:</label>&nbsp;
                            <input 
                            type="password" 
                            size="22"
                            required
                            name='conpassword'
                            value={uData.conpassword}
                  
                            onChange={handleInputChange}
                            />
                            </div>
                            <p ref={passStrengthRef} className="password-strength"></p>
                    </div>
                    

                    <button type='submit'>Create Account</button>

                </form>
                <p ref={responseMessage} className='submit-response'/>
        </div>
    );
}


export default SignUp



