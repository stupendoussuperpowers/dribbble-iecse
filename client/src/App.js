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

import FollowersPage from './Pages/FollowersPage'
import FollowingPage from './Pages/FollowingPage'

import dribbble from './dribbble.svg'
import iecse from './ieces.svg'

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
          <img src={dribbble} width="100px"/>  <img src={iecse} width ="100px" />
        </div>
        <Router>
        <div className = "header2">
          
          <Link to="/home" style={this.state.style}>Explore  </Link>
          <Link to="/adddesign" style={this.state.style}>Add Design</Link>
          <Link to="/myprofile" style={this.state.style}>MyProfile </Link>
          
        </div>
       
          <Switch>
            <Route path="/login" exact component={LoginPage}></Route>
            <Route path="/register" exact component={RegisterPage}></Route>
            <Route path="/home" exact component={HomePage}></Route>
            <Route path="/myprofile" exact component={ProfilePage}></Route>
            <Route path="/profile/:userID" component={ ({match, userID}) => <OtherProfile userID={match.params.userID} /> }></Route>
            <Route path="/adddesign" exact component={AddDesign}></Route>
            <Route path="/followers/:id" component={({match, id}) => <FollowersPage userID={match.params.id}/>}  ></Route>
            <Route path="/following/:id" component={({match, id}) => <FollowingPage userID={match.params.id}/>}  ></Route>
            <Route path="/post/:postID"  component={ ({match, postID}) => <PostPage postID={match.params.postID}/>}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
