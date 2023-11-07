  const userData = {
    userID: '',
    type: 'driver',
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
    }],
    password: ''
};

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

    console.log("Updated userData.")
    console.log(userData)

    return userData
  }


  function updateType(type){
    userData.type = type
  }


  export {userData, updateType, updateUserData};