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
import CreateA from "./components/DBpages/createaccount";
import MainPage from "./components/mainpage";
import DBHome from './components/DBpages/dbhome';
import ViewA from './components/DBpages/viewaccount';
import UpdateA from './components/DBpages/updateaccount';
import AssignR from './components/DBpages/assignrole';
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
          <Route path="/createA" component={CreateA} />
          <Route path="/dbhome" component={DBHome} />
          <Route path="/viewaccount" component={ViewA} />
          <Route path="/updateaccount" component={UpdateA} />
          <Route path="/assignrole" component={AssignR} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;











