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


async function  checkID(id){
    console.log(id)
    const response = await fetch(GetQURL + id, {
        method: 'GET'     
    })
}

export function createAuditLog(type,sp,dr,pts,passType,status, reason){
    
    
    var id = uuidv4()
    

    if(checkID(id)){
        console.log("True")
    }
    

    auditData.auditID = id
    auditData.type = type
    auditData.date = new Date().toGMTString()
    auditData.sponsor = sp
    auditData.driver = dr
    auditData.points = pts
    auditData.passType = passType
    auditData.status = status
    auditData.reason = reason
    postAudit()
}