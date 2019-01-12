import React from 'react';
import { register } from '../../actions/auth';

class Register extends React.Component {
  
  state = {
    userName: null,
    password: null,
    gender: null
  }

  handleChange = (event) => {
    const {
      name, value
    } = event.target;

    this.setState({[name]: value});
  }

  handleRegister = async (e) => {
    e.preventDefault();
    let {userName, password, gender} = this.state;

    if (userName && password && gender) {
      const response = await register({userName, password, gender});

      if (response.status) {
        localStorage.setItem("user", JSON.stringify(response.user));
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
      <form onSubmit={this.handleRegister.bind(this)}>
        <h3>Register Here</h3>
        <input type="text" name="userName" onChange = {this.handleChange.bind(this)} placeholder="enter you username" />
        <input type="password" name="password" onChange = {this.handleChange.bind(this)} placeholder="enter password" />
        <input type="text" name="gender" onChange = {this.handleChange.bind(this)} placeholder="enter you gender" />
        <input type="submit" value="Register" />
      </form>
    );
  }

}

export default Register;