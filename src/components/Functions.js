const auditData = {
    type: '',
    date: '',
    sponsor: '',
    driver: '',
    points: 0,
    passType: '',
    status: '',
    reason: ''
}

function submitAudit(){
    switch(auditData.type){
        case 'driverApp':
            console.log(auditData.date + " - Driver Application - "+ auditData.sponsor + " - " + auditData.driver + " - " + auditData.status)
            break;
        case 'pointChange':

            break;
        case 'passwordChange':
            console.log(auditData.date + " - Password Change - " + auditData.status);
            break;
        case 'usernameChange':
            console.log(auditData.date + " - Username Change - " + auditData.status);
            break;
        case 'emailChange':
            console.log(auditData.date + " - Email Change - " + auditData.status);
            break;
        case 'loginAttempt':
            console.log(auditData.date + " - Login Attempt - " + auditData.driver + " - " + auditData.status)
            break;
        case 'createAccount':
            console.log(auditData.date + " - Account Creation - " + " - " + auditData.status);
            break;
        default:
            break;
    }
}


export function createAuditLog(type,sp,dr,pts,passType,status, reason){
    auditData.type = type
    auditData.date = new Date().toGMTString()
    auditData.sponsor = sp
    auditData.driver = dr
    auditData.points = pts
    auditData.passType = passType
    auditData.status = status
    auditData.reason = reason
    submitAudit()
}