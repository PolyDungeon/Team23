import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Catelog from "./components/Catelog";
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
import createAdmin from './components/Admin/CreateAdmin';
import createSponsorOrg from './components/Admin/CreateSponsorOrg';
import Login from './components/Login';
import SponsorProfile from './components/Sponsor/SponsorProfile';
import ChangePassword from './components/ChangePassword';
import SignUp from './components/SignUp';



function App() {
  // Define searchResults state
  const [searchResults, setPrintableSearchResults] = useState([]);

  // Define addToSearchResults function to update the state
  function addToSearchResults(newEntry) {
    // Push the new entry to the existing array
    setPrintableSearchResults(prevResults => [...prevResults, newEntry]);
  }

  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login}/>
        <Route path="/notifications" component={Notifications} />
        <Route path="/profile" component={Profile} />
        <Route path="/catelog" render={() => <Catelog printableSearchResults={searchResults} />} />
        <Route path="/details" component={Details} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/driver/signup" component={DriverApp} />
        <Route path="/admin">
          <Route path="/admin/home" component={AdminProfile}/>
          <Route path="/admin/reports" component={AdminReports} />
          <Route path="/admin/create">
            <Route path="/admin/create/admin" component={createAdmin}/>
            <Route path="/admin/create/sponsororg" component={createSponsorOrg}/>
          </Route>
        </Route>
        <Route
          path="/Products/FindItems"
          render={() => <ItemsPage addToSearchResults={addToSearchResults} printableSearchResults={searchResults} />}
        />
        <Route path="/sponsor/home" component={SponsorProfile}/>
        <Route path="/changePassword" component={ChangePassword}/>
        <Route component={Default} />
      </Switch>
      <Popup />
    </React.Fragment>
  );
}

export default App;
