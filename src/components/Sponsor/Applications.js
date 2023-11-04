import React, {useState} from 'react'
import styled from 'styled-components'


const SponsorApplications = () =>{
    const [appForm, setAppForm] = useState({
        appStatus: 'submitted',
        organization: 'test'
    })
    const handleInputChange = (event) =>{
        const {name,value} = event.target
        setAppForm({...appForm, [name]:value})
    }

    const appUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/applications'
    const userUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'

    const getApp = async () =>{
        const response = await fetch(appUrl + "?status=" + appForm.appStatus + "&org=" + appForm.organization, {
            method: 'GET'
        })
        const result = await response.json()

        return result
    }

    const getUser = async (username) => {
        const response = await fetch(userUrl + "?username=" + username, {
            method: 'GET'
        })
        const result = await response.json()
        return result
    }
    const patchUser = async (user) => {
        const response = await fetch(userUrl + '/sponsor', {
            method: 'PATCH',
            body: JSON.stringify(user)
        })
        return response
    }

    const addElement = (item) =>{
        const newDiv = document.createElement("tr");
        newDiv.style.border = "1px solid black"
        const username = document.createElement("td")
        username.textContent = item.driver
        const status = document.createElement("td")
        status.textContent = item.status
        const reason = document.createElement("td")
        reason.textContent = item.reason
        const acceptButton = document.createElement("button");
        const rejectButton = document.createElement("button");

        acceptButton.addEventListener("click", () =>{
            //This will add driver to sponsor and change status of application.
            //Needs to update driver, org, and application

            getUser(item.driver).then(foundUser => {
                const user = foundUser[0]

                if(user.sponsorList[0].sponsor === ''){
                    user.sponsorList[0].sponsor = 'temp'
                }else{
                    const newSponsor = {
                        sponsor: 'temp',
                        points: 0
                    }
                    user.sponsorList.push(newSponsor)
                }
                
                patchUser(user).then(patchResponse =>{
                    if(!patchResponse.ok){
                        return
                    }
                })

                

            })

        })
        const atxt = document.createTextNode("Accept")
        acceptButton.appendChild(atxt)
        acceptButton.style.margin = '5px'; 

        rejectButton.addEventListener("click", () =>{
            //This will change status of application to rejected
            //Just updates application.
        })
        const rtxt = document.createTextNode("Reject")
        rejectButton.appendChild(rtxt)
        rejectButton.style.margin = '5px';

        newDiv.appendChild(username);
        newDiv.appendChild(status);
        newDiv.appendChild(reason);
        newDiv.appendChild(acceptButton);
        newDiv.appendChild(rejectButton);
        document.getElementById("AppList").appendChild(newDiv);
    }

    const findApplications = (event) => {
        event.preventDefault();

        getApp().then(appList =>{
            for(var i = 0; i < appList.length; i++){
                addElement(appList[i])
            }
        })
    }
    return(
        <div>
            <h3>Driver Applications</h3>

            <div>
                <label>Status</label>&nbsp;
                <select
                    name="appStatus"
                    value={appForm.appStatus}
                    onChange={handleInputChange}
                >
                    <option value='submitted'>Submitted</option>
                    <option value='accepted'>Accepted</option>
                    <option value='rejected'>Rejected</option>
                </select>&nbsp;
                <button onClick={findApplications}>Search</button>
            </div>
            <div>
                <AppTable id='AppList'>
                    <tr>
                        <th className='head'>Username</th>
                        <th className='head'>Status</th>
                        <th className='head'>Reason</th>
                    </tr>
                </AppTable>
            </div>
        </div>
    )

}

export default SponsorApplications

const AppTable = styled.table`



.head {
    padding: 0rem 3rem;
    border: 1px solid black;
}




`;