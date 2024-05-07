//import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Navbar from "./components/navbar";
//import Footer from "./components/footer";
import Home from "./components/pages/home";
import Buys from "./components/pages/buy";
import Rents from "./components/pages/rent";
import Sells from "./components/pages/sell";
import Agents from "./components/pages/agent";
import Login from "./components/pages/login";
//Admin pages
import CreateA from "./components/DBpages/createaccount";
import MainPage from "./components/mainpage";
import ViewA from './components/DBpages/viewaccount';
import UpdateA from './components/DBpages/updateaccount';
import ProfileDB from './components/DBpages/profile';
//Buyer page
import BProperties from './components/DBbuyer/buyerproperties';
import RateReviewAgents from './components/DBbuyer/rrAgents';
import CalculateMortgage from './components/DBbuyer/calculateMort';
import BuyerSaveProperty from './components/DBbuyer/buyersaveproperty';
// route to dashboard of each roles
import DBHome from './components/DBpages/dbhome';
import DBBuyerHome from './components/DBbuyer/dbbuyerhome';
import './index.css'

function App() {

  return (
    <Router>
      <div>
        {/*<Navbar />*/}
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/home" component={Home} />
          <Route path="/buys" component={Buys} />
          <Route path="/sells" component={Sells} />
          <Route path="/rents" component={Rents} />
          <Route path="/agents" component={Agents} />
          <Route path="/login" component={Login} />
          {/* admins pages */}
          <Route path="/createA" component={CreateA} />
          <Route path="/dbhome" component={DBHome} />
          <Route path="/viewaccount" component={ViewA} />
          <Route path="/updateaccount" component={UpdateA} />
          <Route path="/profile" component={ProfileDB} />
          {/* Buyer page */}
          <Route path="/dbbuyerhome" component={DBBuyerHome} />
          <Route path="/buyerproperties" component={BProperties} />
          <Route path="/rrAgents" component={RateReviewAgents} />
          <Route path="/calculateMort" component={CalculateMortgage} />
          <Route path="/buyersaveproperty" component={BuyerSaveProperty} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;











