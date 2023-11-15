import React, {useState} from 'react'
import styled from 'styled-components'
import { userData } from '../UserData'
import { createAuditLog } from '../AuditLogging'


const SponsorApplications = () =>{
    const [appForm, setAppForm] = useState({
        appStatus: 'submitted',
        organization: ''
    })
    const handleInputChange = (event) =>{
        const {name,value} = event.target
        setAppForm({...appForm, [name]:value})
    }

    const appUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/applications'
    const userUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'
    const orgUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/orgs'

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

    const getOrg =  async () => {
        const response = await fetch(orgUrl + '/' + userData.sponsorList[0].sponsor, {
            method: 'GET'
        })
        const result = await response.json()
        return result
    }
    
    const patchOrg = async (org) => {
        const response = await fetch(orgUrl + '/new/driver', {
            method: 'PATCH',
            body: JSON.stringify(org)
        })
        return response
    }

    const patchApp = async (app) =>{
        const response = await fetch(appUrl + '/status', {
            method: 'PATCH',
            body: JSON.stringify(app)
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
            getUser(item.driver).then(foundUser => {
                const user = foundUser[0]

                if(user.sponsorList[0].sponsor === ''){
                    user.sponsorList[0].sponsor = userData.sponsorList[0].sponsor
                }else{
                    const newSponsor = {
                        sponsor: userData.sponsorList[0].sponsor,
                        points: 0
                    }
                    user.sponsorList.push(newSponsor)
                }
                
                patchUser(user).then(patchResponse =>{
                    if(!patchResponse.ok){
                        return
                    }
                })
                
                getOrg().then(foundOrgs =>{
                    const org = foundOrgs

                    if(org.driverUsers[0].userID === ''){
                        org.driverUsers[0].userID = user.userID
                        org.driverUsers[0].email = user.email
                        org.driverUsers[0].username = user.username
                    }else{
                        const driver = {
                            userID: user.userID,
                            email: user.email,
                            username: user.username
                        }
                        org.driverUsers.push(driver)
                    }

                    patchOrg(org).then(patchResponse => {
                        if(!patchResponse.ok){
                            return
                        }
                    })
                })
            })
            const tempApp = item
            tempApp.status = 'accepted'
            patchApp(tempApp).then(patchResponse => {
                if(!patchResponse.ok){
                    return
                }
            })

            createAuditLog('driverApp', item.org, item.driver, null, null, 'accepted', null)
            document.getElementById("AppList").removeChild(newDiv);
            return
        })
        const atxt = document.createTextNode("Accept")
        acceptButton.appendChild(atxt)
        acceptButton.style.margin = '5px'; 

        rejectButton.addEventListener("click", () =>{
            //This will change status of application to rejected
            //Just updates application.

            const tempApp = item
            tempApp.status = 'rejected'
            patchApp(tempApp).then(patchResponse => {
                if(!patchResponse.ok){
                    return
                }
            })
            createAuditLog('driverApp', item.org, item.driver, null, null, 'rejected', null)
            document.getElementById("AppList").removeChild(newDiv);
            return
        })
        const rtxt = document.createTextNode("Reject")
        rejectButton.appendChild(rtxt)
        rejectButton.style.margin = '5px';

        newDiv.appendChild(username);
        newDiv.appendChild(status);
        newDiv.appendChild(reason);

        if(item.status === 'submitted'){
            newDiv.appendChild(acceptButton);
            newDiv.appendChild(rejectButton);
        }
        document.getElementById("AppList").appendChild(newDiv);
    }

    const findApplications = (event) => {
        event.preventDefault();
        document.getElementById("AppList").innerHTML = ''

        const headRow = document.createElement('tr') 
        const headUsername = document.createElement('th')
        headUsername.className = 'head'
        headUsername.textContent = 'Username'
        
        const headStatus = document.createElement('th')
        headStatus.className = 'head'
        headStatus.textContent = 'Status'

        const headReason = document.createElement('th')
        headReason.className = 'head'
        headReason.textContent = 'Reason'

        headRow.appendChild(headUsername)
        headRow.appendChild(headStatus)
        headRow.appendChild(headReason)
        document.getElementById("AppList").appendChild(headRow)

        getOrg().then(response =>{
            appForm.organization = response.name
            getApp().then(appList =>{
                for(var i = 0; i < appList.length; i++){
                    addElement(appList[i])
                }
            })
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