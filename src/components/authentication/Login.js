import React from 'react';
import { login, isLoggedIn } from '../../actions/auth';

class Login extends React.Component {

  state = {
    userName: null,
    password: null
  }

  componentDidMount = async () => {
    const isAlreadyLoggedIn = await isLoggedIn();
    if (isAlreadyLoggedIn) {
      window.location.href = '/users';
    }
  }

  handleChange = (event) => {
    const {
      name,
      value
    } = event.target;

    this.setState({
      [name]: value });
  }

  handleSignIn = async (e) => {
    e.preventDefault();
    let { userName, password } = this.state;

    if (userName && password) {
      const response = await login({ ...this.state });

      if (response.status) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/users";
      } else {
        alert(response.errorMessage);
      }
    } else {
      alert("Please enter valid values");
    }

  }

  render() {
    return (
      <div className="jumbotron">
      <form onSubmit={this.handleSignIn}>
        <h3>Sign in</h3>
        <input type="text" name="userName" onChange = {this.handleChange.bind(this)} placeholder="enter you username" />
        <input type="password" name="password" onChange = {this.handleChange.bind(this)} placeholder="enter password" />
        <input type="submit" value="Login" />
      </form>
      </div>
    );
  }

}

export default Login;
