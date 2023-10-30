import React, { useState } from 'react'



const ChangePassword = () => {

    const formData = useState({
        newPass: '',
        retyped: ''
    })

    const changePass = () => {

        

    } 

    return(
        <div>
            <div>
                <h3>Change Password</h3>          
            </div>

            <div>
                <form onSubmit={changePass}>
                    <label>New Password:</label> &nbsp;
                    <input
                        name='newPass'
                        value={formData.newPass}
                    ></input>
                    <br/>
                    <label>Retype Password:</label> &nbsp;
                    <input
                        name='retypePass'
                        value={formData.retyped}
                    ></input>
                    <br/>
                    <button>
                        Submit
                    </button>


                </form>
            </div>


        </div>
    )

}

export default ChangePassword;