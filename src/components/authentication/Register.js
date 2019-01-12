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
      name,
      value
    } = event.target;

    this.setState({
      [name]: value });
  }

  handleRegister = async (e) => {
    e.preventDefault();
    let { userName, password, gender } = this.state;

    if (userName && password && gender) {
      const response = await register({ userName, password, gender });

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
        <form onSubmit={this.handleRegister.bind(this)}>
          <h3>Register Here</h3>
          <p> <label htmlFor="userName">userName</label><input type="text" id="userName" name="userName" onChange = {this.handleChange.bind(this)} placeholder="enter you username" /></p>
          <p> <label htmlFor="password">userName</label><input type="password" id="password" name="password" onChange = {this.handleChange.bind(this)} placeholder="enter password" /></p>
          <p> <label htmlFor="gender">Gender</label>
            <input type="radio"
               value="MALE"
               checked={this.state.gender === "MALE"}
               name="gender"
               onChange={this.handleChange.bind(this)} />MALE

            <input type="radio"
               value="FEMALE"
               name="gender"
               checked={this.state.gender === "FEMALE"}
               onChange={this.handleChange.bind(this)}/>FEMALE
            <input type="radio"
               value="Others"
               name="gender"
               checked={this.state.gender === "Others"}
               onChange={this.handleChange.bind(this)}/>Others</p>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }

}

export default Register;
