import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Catelog from "./components/Catelog";
import Challenges from "./components/Challenges";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";
import Details from "./components/Details";
import Checkout from "./components/Checkout/Checkout";
import Default from "./components/Default";
import Popup from './components/Popup';
import About from './components/About';
import DriverApp from './components/Driver/DriverApp';
import AdminProfile from './components/Admin/AdminProfile';
import ItemsPage from './components/Products/FindItems';
import AdminReports from './components/Admin/AdminReports';
import AdminCreate from './components/Admin/AdminCreate';
import CreateSponsorOrg from './components/Admin/CreateSponsorOrg';
import Login from './components/Login';
import SponsorProfile from './components/Sponsor/SponsorProfile';
import ChangePassword from './components/ChangePassword';
import SignUp from './components/SignUp';
import { CurrentUser } from './components/Login';
import { Redirect } from 'react-router-dom';
import SponsorApplications from './components/Sponsor/Applications';
import ViewDrivers from './components/Sponsor/ViewDrivers';
import DriverPage from './components/Sponsor/DriverPage';
import PurchaseHistory from './components/Checkout/PurchaseHistory'
import { updateUserData, userData } from './components/UserData';

window.onload = function() {
  const user = sessionStorage.getItem('user')
  updateUserData(JSON.parse(user))
}


function App() {
    // Define searchResults state
    const [searchResults, setPrintableSearchResults] = useState([]);
    const [uData,  setuData] = useState(null)

    // Define addToSearchResults function to update the state
    function addToSearchResults(newEntry) {
      // Push the new entry to the existing array
      setPrintableSearchResults(prevResults => [...prevResults, newEntry]);
    }
    var loggedIn = false
    useEffect(()=>{
      if(uData == null){
        const fetchUser = sessionStorage.getItem('user')
        if(fetchUser != null){
          const parseUser = JSON.parse(fetchUser)
          updateUserData(parseUser)
          setuData(userData)
          loggedIn = true
        }
      }
    })
      
      
  return (
    <React.Fragment>
      
      <Navbar />
      <Switch>
        <Route exact path="/" render={()=>{
          return (
            (userData.userID === '') ?
            <Redirect to='/login'/> :
            <Redirect to='/home'/>
          )
        }}
          />
        <Route exact path="/home" component={Homepage}/>
        <Route path="/login" component={Login}/>
        <Route path="/notifications" component={Notifications} />
        <Route path="/profile" component={Profile} />
        <Route path="/catelog" component={Catelog} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/details" component={Details} />
        <Route path="/checkout" component={Checkout} />
        <Route path ="/purchasehistory" component = {PurchaseHistory}/>
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/driver/signup" component={DriverApp} />
        <Route path="/admin">
          <Route path="/admin/home" component={AdminProfile}/>
          <Route path="/admin/reports" component={AdminReports} />
          <Route path="/admin/create">
            <Route path="/admin/create/user" component={AdminCreate}/>
            <Route path="/admin/create/sponsororg" component={CreateSponsorOrg}/>
          </Route>
        </Route>
        <Route
          path="/Products/FindItems"
          render={() => <ItemsPage addToSearchResults={addToSearchResults} printableSearchResults={searchResults} />}
        />
        <Route path="/sponsor/home" component={SponsorProfile}/>
        <Route path="/sponsor/applications" component={SponsorApplications}/>
        <Route path="/sponsor/drivers" component={ViewDrivers}/>
        <Route path="/sponsor/drivers/info" component={DriverPage}/>
        <Route path="/changePassword" component={ChangePassword}/>
        <Route component={Default} />
      </Switch>
      <Popup />
    </React.Fragment>
  );
}

export default App;
