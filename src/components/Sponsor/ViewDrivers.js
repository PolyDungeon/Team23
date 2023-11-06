import React, { useRef, useState } from "react"
import styled from 'styled-components'
import { userData } from "../UserData"
import DriverPage, { updateDriverData } from "./DriverPage"



const ViewDrivers = () =>{

    const orgName = useRef(null)

    const visitUser = (driver) =>{
        getUser(driver.userID).then(user => {
            updateDriverData(user)
            window.history.pushState(null,"","drivers/info")
            window.history.go()
        })
    }

    const addDriver = (driver) =>{
        const newDriver = document.createElement("tr")
        const username = document.createElement("td")
        username.style.paddingRight = '2rem'
        username.style.paddingLeft = '2rem'
        username.textContent = driver.username
        const email = document.createElement("td")
        email.style.paddingRight = '1rem'
        email.textContent = driver.email
        const gotoUser = document.createElement("button")
        newDriver.style.padding = '2rem'
        gotoUser.textContent = "View User Account"
        gotoUser.addEventListener("click", () =>{
            visitUser(driver)
        })

        newDriver.appendChild(username)
        newDriver.appendChild(email)
        newDriver.appendChild(gotoUser)
        document.getElementById('driverList').appendChild(newDriver)
    }

    const orgUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/orgs'
    const userUrl = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/users'

    const getOrg = async (org) => {
        const response = await fetch(orgUrl + "/" + org, {
            method: 'GET'
        })
        const result = await response.json()
        return result
    }

    const getUser = async (user) => {
        const response = await fetch(userUrl + "/" + user, {
            method: 'GET'
        })
        const result = await response.json()
        return result
    }

    const loadDrivers = () =>{
        getOrg(userData.sponsorList[0].sponsor).then(foundOrg => {
            orgName.current.textContent = foundOrg.name + " drivers:"

            for (var x = 0; x < foundOrg.driverUsers.length; x++){
                addDriver(foundOrg.driverUsers[x])
            }

        })
    }

    window.onload = loadDrivers()
    

    return(
        <div id='DriversPage'>
            <h3 ref={orgName}/>
            <DriverList id='driverList'/>
        </div>
    )

}

export default ViewDrivers

const DriverList = styled.table``;