import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class CreateAccount extends Component {
  state = {
    email: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    address: undefined,
    city: undefined,
    state: 'NY',
    zipCode: undefined,
    phoneNumber: undefined,
    second_email: undefined,
    type: 'S',

    user: undefined,

    status: undefined,

    result: undefined,
  }
  componentDidMount(){
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    let inputState = {};
    inputState[name]=value;
    this.setState(inputState)
  }
  createAccount = e => {
    e.preventDefault();
    axios
    .post('/user-list.json',{
      email: this.state.email,
      second_email: this.state.second_email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      phoneNumber: this.state.phoneNumber,
      type: this.state.type,
      country: 'USA'
    })
    .then(res => {
      this.setState({result:res})
    })
    .catch(err => {
      this.setState({result:err})
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded p-4 m-4">
              <h3 className="text-center">Create Account</h3>
              <form className="row" onSubmit={this.createAccount}>
                <div className="col-md-12">
                  <label>Username</label>
                  <input className="form-control" name="email" onChange={this.handleChange} required/>
                  <br />
                </div>
                <div className="col-md-12">
                  <label>Password</label>
                  <input type="password" className="form-control" name="password" onChange={this.handleChange} required/>
                  <p className="text-secondary">Needs 1 Special character and a number</p>
                  <p className="text-secondary">Minimum length is 8</p>
                  <br />
                </div>
                <div className="col-md-12">
                  <label>Email</label>
                  <input className="form-control" name="second_email" onChange={this.handleChange} required/>
                  <br />
                </div>
                <div className="col-md-6">
                  <label>First Name</label>
                  <input className="form-control" name="firstName" onChange={this.handleChange} required/>
                  <br />
                </div>
                <div className="col-md-6">
                  <label>Last Name</label>
                  <input className="form-control" name="lastName" onChange={this.handleChange} required/>
                  <br />
                </div>
                <div className="col-md-8">
                  <label>Street Address</label>
                  <input className="form-control" name="address" onChange={this.handleChange} required/>
                  <br />
                </div>
                <div className="col-md-4">
                  <label>City</label>
                  <input className="form-control" name="city" onChange={this.handleChange} required/>
                  <br />
                </div>
                <div className="col-md-2">
                  <label>State</label>
                  <select className="form-control" name="state" defaultValue='NY' onChange={this.handleChange} required>
                    <option>NY</option>
                    <option>OH</option>
                    <option>OK</option>
                    <option>OR</option>
                    <option>PA</option>
                  </select>
                  <br />
                </div>
                <div className="col-md-2">
                  <label>Zip Code</label>
                  <input className="form-control" name="zipCode" onChange={this.handleChange} required/>
                  <br />
                </div>
                <div className="col-md-5">
                  <label>Phone Number</label>
                  <input className="form-control" name="phoneNumber" onChange={this.handleChange} required/>
                  <br />
                </div>
                <div className="col-md-3">
                  <label>Type</label>
                  <select className="form-control" name="type" defaultValue='S' onChange={this.handleChange}>
                    <option value='S' disabled>Student</option>
                  </select>
                  <br />
                </div>
                <div className="col-md-12">
                  <button className="form-control btn btn-info" type="submit">Create Account</button>
                </div>
              </form>
              <br />
              {this.state.status==undefined?(
                <p></p>
              ):(
                this.state.status!=201?(
                  <h4 className="col-md-12 text-center">Failed</h4>
                ):(
                  <h4 className="col-md-12 text-center">Successful!</h4>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}

export default CreateAccount;
