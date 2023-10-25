import React,{ useState, useEffect,useRef} from 'react'
import {dynamodb} from "aws-sdk"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
const About = () => {
    var AWS = require('aws-sdk')
    AWS.config.update({region:'us-east-1'})
    var docClient = new AWS.DynamoDB.DocumentClient();
    var ddb = new AWS.DynamoDB();
    //URL will be updated when we have a working database
    const url = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/items';
    const [data, setData] = useState({
        team: 20,
        sprint: '',
        version: '',
    });
    
    const teamRef = useRef(null);
    const versionRef = useRef(null);
    const sprintRef = useRef(null);
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
                    <p ref={teamRef}>Team: 20</p>
                    <p>Sprint: {data.sprint}</p>
                    <p>Version: {data.version}</p>
                    <h5>What is TruckBucks?</h5>
            </div>
        );
    

}
export default About;