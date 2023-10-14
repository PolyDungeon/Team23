const userData ={
    type: 'admin',
    userID: 'df910ds92sdf', // Database unique identifier
    name: 'John Smith',
    email: 'exampleUser@yahoo.com',
    phone: '123-456-7890',
    password: 'password123',
    points: 100, // Replace with user's actual points
    newPassword: '',
    confirmNewPassword: '',
  };


  function updateType(type){
    userData.type = type
  }


  export {userData, updateType};