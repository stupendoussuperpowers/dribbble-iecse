import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import ProfilePage from './Pages/ProfilePage.jsx'
import AddDesign from './Pages/AddDesign.jsx'
import PostPage from './Pages/PostPage'
import OtherProfile from './Pages/OtherProfile'

import {Link} from 'react-router-dom'

class App extends React.Component {
  
  constructor(){
    super()
    this.state = {style: { textDecoration: "none", color: "black" } }
  }
  render(){
    return (
      <div className="App">
        <div className = "header">
          dribbble  x  iecse
        </div>
        <div>
          <Router>
          <Link to="/home" style={this.state.style}>Explore</Link>
          <Link to="/myprofile" style={this.state.style}>
          MyProfile
          </Link>
          </Router>
        </div>
        <Router>
          <Switch>
            <Route path="/login" exact component={LoginPage}></Route>
            <Route path="/register" exact component={RegisterPage}></Route>
            <Route path="/home" exact component={HomePage}></Route>
            <Route path="/myprofile" exact component={ProfilePage}></Route>
            <Route path="/profile/:userID" component={ ({match, userID}) => <OtherProfile userID={match.params.userID} /> }></Route>
            <Route path="/adddesign" exact component={AddDesign}></Route>
            <Route path="/post/:postID"  component={ ({match, postID}) => <PostPage postID={match.params.postID}/>}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
