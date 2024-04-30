import React from 'react';
//import {Route,Switch,Link} from 'react-router-dom';
import Navbar from "./navbar";
import Home from "./pages/home";
import Buys from "./pages/buy";
import Rents from "./pages/rent";
import Sells from "./pages/sell";
import Agents from "./pages/agent";
import Footer from "./footer";

const MainPage = () => {
  //const location = useLocation();

  return (
    <div>
      <Navbar />
      <>
        <Home />
        <Buys />
        <Sells />
        <Rents />
        <Agents />
      {/*<Route exact path="/home" component={Home} />
      <Route path="/buys" component={Buys} />
      <Route path="/sells" component={Sells} />
      <Route path="/rents" component={Rents} />
  <Route path="/agents" component={Agents} />*/}
  </>
  <Footer />
    </div>
  );
};

export default MainPage;
