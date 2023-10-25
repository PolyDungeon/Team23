import { v4 as uuidv4 } from 'uuid';

const auditData = {
    auditID: '',
    type: '',
    date: '',
    sponsor: '',
    driver: '',
    points: 0,
    passType: '',
    status: '',
    reason: ''
}
const PostURL = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/audit'
const GetQURL = 'https://qjjhd7tdf1.execute-api.us-east-1.amazonaws.com/audit/'

const postAudit = async () => {
    const response = await fetch(PostURL, {
        method: 'POST',
        body: JSON.stringify(auditData)
    })
}

function submitAudit(){
    switch(auditData.type){
        case 'driverApp':
            console.log(auditData.date + " - Driver Application - "+ auditData.sponsor + " - " + auditData.driver + " - " + auditData.status)
            break;
        case 'pointChange':
            console.log(auditData.date + " - Point Change - " + auditData.sponsor + " - " + auditData.driver + " - " + auditData.pts + " - " + auditData.status + " - " + auditData.reason)
            break;
        case 'passwordChange':
            console.log(auditData.date + " - Password Change - " + auditData.driver + " - " + auditData.passType + " - " + auditData.status + " - " + auditData.reason)
            break;
        case 'loginAttempt':
            console.log(auditData.date + " - Login Attempt - " + auditData.driver + " - " + auditData.status)
            break;
        default:
            break;
    }
}

async function  checkID(id){
    const response = await fetch(GetQURL + id, {
        method: 'GET'     
    })

    if(response.ok){
        console.log("Success")
    }else{
        console.log("Failure")
    }
    return false
}







export function createAuditLog(type,sp,dr,pts,passType,status, reason){
    
    var id = uuidv4()

    auditData.auditID = id
    auditData.type = type
    auditData.date = new Date().toGMTString()
    auditData.sponsor = sp
    auditData.driver = dr
    auditData.points = pts
    auditData.passType = passType
    auditData.status = status
    auditData.reason = reason
    submitAudit()
    postAudit()
}