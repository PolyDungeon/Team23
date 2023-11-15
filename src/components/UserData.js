  var userData = {
    userID: '',
    type: '',
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
    }]
};

const baseUserData = { //Use this to reset userdata
  userID: '',
  type: '',
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
  }]
};

var activeSponsor = {
  orgID: '',
  name: '',
  catalogID: '',
  points: 0
}

const defaultSponsor = {
  orgID: '',
  name: '',
  catalogID: '',
  points: 0
}

  function updateUserData(user){
    if(user.userID !== ''){
      userData.userID = user.userID
    }

    if(user.type !== ''){
      userData.type = user.type
    }
    
    if(user.username !== ''){
      userData.username = user.username
    }

    if(user.firstName !== ''){
      userData.firstName = user.firstName
    }

    if(user.lastName !== ''){
      userData.lastName = user.lastName
    }

    if(user.email !== ''){
      userData.email = user.email
    }

    if(user.phone !== ''){
      userData.phone = user.phone
    }

    if(user.address.line1 !== ''){
      userData.address = user.address
    }

    if(user.sponsorList[0].sponsor !== ''){
      userData.sponsorList = user.sponsorList
    }    

    if(user.password !== ''){
      userData.password = user.password
    }


  function updateType(type){
    userData.type = type
  }

  function logoutUser(){
    userData = baseUserData
    console.log("Updated userData.")
    console.log(userData)
  }

  function updateSponsor(sponsor){
    if(sponsor.orgID !== ''){
      activeSponsor.orgID = sponsor.orgID
    }
    if(sponsor.catalogID !== ''){
      activeSponsor.catalogID = sponsor.catalogID
    }
    if(sponsor.name !== ''){
      activeSponsor.name = sponsor.name
    }
    if(sponsor.points !== null){
      activeSponsor.points = sponsor.points
    }
  }


  export {userData, updateType, updateUserData, logoutUser, activeSponsor, updateSponsor};