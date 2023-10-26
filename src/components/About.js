import React,{ useState, useEffect,useRef} from 'react'
import {dynamodb} from "aws-sdk"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import styled from 'styled-components';
const About = () => {
    var AWS = require('aws-sdk')
    AWS.config.update({region:'us-east-1'})
    var docClient = new AWS.DynamoDB.DocumentClient();
    var ddb = new AWS.DynamoDB();
    //URL will be updated when we have a working database
    const url = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/items';
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [data, setData] = useState({
        team: 20,
        sprint: '',
        version: '',
    });
    
    const teamRef = useRef(null);
    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    };
    const buttonStyle = {
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    const contentStyle = {
        display: dropDownOpen ? 'block' : 'none',
        position: 'absolute',
        backgroundColor: '#f9f9f9',
        minWidth: '160px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: 1,
    };
    useEffect(() => {
        fetchData();
    },[]);
    const fetchData = async() => {
        try{
            const response = await fetch(url, {method: 'GET'});
            if(!response.ok){
                throw new Error('network response was not ok');
            }
            const resultsArray = await response.json();
            
            setData({sprint: resultsArray[0].sprintID, version: resultsArray[0].version})
        }catch( error){
            console.error('error fetching data',error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])
        
    
    
        return (
        
            <div className="content">
                
                <h1>TruckBucks</h1>
                    <p >Team: {data.team}</p>
                    <p>Sprint: {data.sprint}</p>
                    <p>Version: {data.version}</p>
                    <h5>What is TruckBucks?</h5>
    
                <button className="dropdown-button" style = {buttonStyle} onClick={toggleDropDown}>What is TruckBucks?</button>
                {dropDownOpen && (
                    <div className="dropdown-content"  style={contentStyle}>
                        <p>TruckBucks allows companies to incentivize good behavior</p>
                        <p>It ensures drivers are driving to the best of their abilities</p>
                        <p>Making driving rewarding again!</p>
                </div>
            )}
        </div>
    );
}
export default About;