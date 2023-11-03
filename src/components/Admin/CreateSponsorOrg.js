import React, { useRef,useState } from 'react';
import { v4 as uuidv4 } from 'uuid';



const CreateSponsorOrg = () => {

    const responseMessage = useRef(null)

    const [sponsorType,setSponsorType] = useState({
        type: 'old',
        user: ''
    })
    const updateForm = (event) => {
        const  {name, value} = event.target
        setSponsorType({...sponsorType, [name]: value})
    }

    const tempOrgData = {
        orgID: '',
        name: '',
        catalogID: '',
        txID: '',
        sponsorUsers: [{
            userID: '',
            username: '',
            email: ''
        }],
        driverUsers:[{
            userID: '',
            username: '',
            email: ''
        }]
    }

    const [userData, setUserData] = useState({
        userID: '',
        type: 'sponsor',
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
        password: '!Password123',
        
    })

    const updateUser = (event) => {
        const {name, value} = event.target
        setUserData({...userData, [name]: value})
    }

    const url = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/orgs'
    const userUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'

    const [orgData, setOrgData] = useState(tempOrgData)

    const postOrg = async () => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(orgData)
        })
        return response
    }

    const getOrg = async () => {
        const response = await fetch(url + '?name=' + orgData.name, {
            method: 'GET'
        })
        const results = await response.json()

        return results
    }
    
    const getUser = async (username) => {
        const response = await fetch(userUrl + '?username=' + username, {
            method: 'GET'
        })
        const results = await response.json()

        return results
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        
        getOrg().then(results =>{
            if(results.length !== 0){
                responseMessage.current.textContent = "Organization name already taken."
                return
            }
            const id = uuidv4()

            if(sponsorType.type === 'old'){
                getUser(sponsorType.user).then(foundUser =>{
                    if(foundUser.length === 0){
                        responseMessage.current.textContent = "User does not exist."
                        return
                    }
                    const oldUser = foundUser[0]

                    orgData.orgID = id
                    orgData.sponsorUsers[0].userID = oldUser.userID
                    orgData.sponsorUsers[0].email = oldUser.email
                    orgData.sponsorUsers[0].username = oldUser.username
                    
                    userData.sponsorList[0].sponsor = id
                    //Need to send orgData to database and update user with sponsor
                })
            }else if (sponsorType.type === 'new'){

            }

            
        })
            





        
        
        
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setOrgData({...orgData, [name]: value})
    }
    

    return(
    <div className="content">
        <h3>Create a Sponsor Organization</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Organization Name:</label>&nbsp;
                    <input
                    type='name'
                    name='name'
                    required
                    value={orgData.name}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Sponsor:</label>&nbsp;
                    <select
                        name='type'
                        value={sponsorType.type}
                        onChange={updateForm}
                        >
                            <option value='old'>Existing Sponsor</option>
                            <option value='new'>New Sponsor</option>
                        </select>
                </div>

                {(sponsorType.type === 'old') &&(
                    <div>
                        <label>Search for user:</label>&nbsp;
                        <input
                            name='user'
                            value={sponsorType.user}
                            onChange={updateForm}
                        />
                    </div>
                )}
                {(sponsorType.type === 'new') &&(
                <div>
                    <div>
                        <label>Email:</label>&nbsp;
                        <input
                            name='email'
                            value={userData.email}
                            onChange={updateUser}
                        />
                    </div>
                    <div>
                        <label>Username:</label>&nbsp;
                        <input
                            name='username'
                            value={userData.username}
                            onChange={updateUser}
                        />
                    </div>
                </div>
                )}
                <button type='submit'>Create Organization</button>
            </form>
            <div>
                <p ref={responseMessage} className='submit-response' />
            </div>
    </div>
    )
}
export default CreateSponsorOrg