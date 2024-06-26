//import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import ViewA from "./components/DBpages/viewaccount";
import UpdateA from "./components/DBpages/updateaccount";
import ProfileDB from "./components/DBpages/profile";
//Buyer page
import BProperties from "./components/DBbuyer/buyerproperties";
import RateReviewAgents from "./components/DBbuyer/rrAgents";
import CalculateMortgage from "./components/DBbuyer/calculateMort";
import BuyerSaveProperty from "./components/DBbuyer/buyersaveproperty";
//Seller page
import SellerProperties from "./components/DBseller/sellerproperties";
import rrAgentSeller from "./components/DBseller/rrAgentSeller";
//Real-estate page
import Listing from "./components/DBreal/propertylisting";
import RealViewRR from "./components/DBreal/realviewrr";
import ViewRP from "./components/DBreal/viewrealproperty";
// route to dashboard of each roles
import DBHome from "./components/DBpages/dbhome";
import DBBuyerHome from "./components/DBbuyer/dbbuyerhome";
import SellerHome from "./components/DBseller/dbsellerhome";
import DBReal from "./components/DBreal/dbrealhome";
import "./index.css";

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
          {/* Seller page */}
          <Route path="/dbsellerhome" component={SellerHome} />
          <Route path="/sellerproperties" component={SellerProperties} />
          <Route path="/rrAgentSeller" component={rrAgentSeller} />
          {/* Real-estate page */}
          <Route path="/dbrealhome" component={DBReal} />
          <Route path="/propertylisting" component={Listing} />
          <Route path="/viewrealproperty" component={ViewRP} />
          <Route path="/realviewrr" component={RealViewRR} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
