import React from 'react'
import './App.css';
import {GlobalProvider} from './Components/Context/GlobalStroge';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import SignIn from './Components/userVarification/Login'
import SignUp from './Components/userVarification/SignUp'
import NavBar from './Components/NavBar/NavBar'
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home'
import Groupinfo from './Components/GroupInformetion/Groupinfo'
import EditProfile from './Components/Profile/EditYourProfile'

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Router>
          <NavBar/>
          <Switch>
          <Route exact path="/" component = {Home} />
          <Route exact path="/login" component = {SignIn} />
          <Route exact path="/signup" component = {SignUp} />
          <Route exact path="/profile/:id" component = {Profile} />
          <Route exact path="/ginfo/:id" component = {Groupinfo} />
          <Route exact path="/editprofile/:id" component = {EditProfile} />
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
