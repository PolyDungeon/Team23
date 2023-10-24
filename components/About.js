import React,{ useState, useEffect} from 'react'
import {dynamodb} from "aws-sdk"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
const About = () => {
    var AWS = require('aws-sdk')
    AWS.config.update({region:'us-east-1'})
    var ddb = new AWS.DynamoDB();
    //URL will be updated when we have a working database
    const url = "https://dynamodb.us-east-1.amazonaws.com";
    const [data, setData] = useState([]);

    const fetchInfo = () =>{
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setData(d))
    }

    useEffect(() => {
       var params = {
        TableName: 'AboutPage',
        Key: {
            'Key_Name': {S:"info"}
        },
        ProjectionExpression: 'Release Date:'
       };
       ddb.getItem(params,function(error,data){
       })
    }, []);

    
    return (
        <div className="content">
            
            <h1>TruckBucks</h1>
                <p>Team:</p>
                <p>Version:</p>
                <p>{data}</p>
                <h5>What is TruckBucks?</h5>
                <p>...</p>
            
        </div>
    );
}

export default About;
