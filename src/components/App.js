/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

import AboutPage from "./about/AboutPage";
import Login from "./authentication/Login";
import Users from "./user/Users";
import Register from "./authentication/Register";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";


import { logout, isLoggedIn } from '../actions/auth';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }
  

  componentDidMount = async () => {
    const isAlreadyLoggedIn = await isLoggedIn();
    if (isAlreadyLoggedIn) {
      this.setState({loggedIn: true});
    }
  }

  handleLogout = (e) => {
    e.preventDefault();
    const success = logout();
    if (success) {
      this.setState({loggedIn: false});
      window.location.href = '/';
    }
  }
  render() {
    const activeStyle = { color: 'blue' };
    const { loggedIn } = this.state;

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {" | "} 
          {!loggedIn && 
           <NavLink to="/register" activeStyle={activeStyle}>Register</NavLink>}
          {' | '}
          <NavLink to="/users" activeStyle={activeStyle}>Users</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
          {' | '}
            {loggedIn ?  <a href="#" className="btn btn-info" onClick={this.handleLogout.bind(this)}>
              <span className="glyphicon glyphicon-log-out"></span> Log out
            </a> : (<NavLink to="/login" activeStyle={activeStyle}>Login</NavLink>)
          }
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/users" component={Users} location="/users"/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
