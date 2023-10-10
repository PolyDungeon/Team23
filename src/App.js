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
import SignUp from './components/SignUp';
import ItemsPage from './components/Products/FindItems';

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
        <Route path="/notifications" component={Notifications} />
        <Route path="/profile" component={Profile} />
        <Route path="/catelog" render={() => <Catelog printableSearchResults={searchResults} />} />
        <Route path="/details" component={Details} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp} />
        <Route
          path="/Products/FindItems"
          render={() => <ItemsPage addToSearchResults={addToSearchResults} printableSearchResults={searchResults} />}
        />
        <Route component={Default} />
      </Switch>
      <Popup />
    </React.Fragment>
  );
}

export default App;
