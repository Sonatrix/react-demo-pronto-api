import React from 'react';
import { isLoggedIn } from '../actions/auth';

class HomePage extends React.Component {
  constructor() {
  	super();
  	this.state = {
  		loggedIn: false,
  		userName: null
  	}
  }

  componentDidMount = async () => {
  	const user = await isLoggedIn();
  	this.setState({...user, loggedIn: true});
  }

  render() {
  	const {loggedIn, userName} = this.state;
	  return (
	    <div className="jumbotron">
	    {loggedIn && <h1>Welcome {userName} </h1>}
	      <h2>Pronto Labs Demo Test API</h2>
	      {!loggedIn && <h2>Please login to see users</h2>}
	    </div>
	  );
	}
};

export default HomePage;
