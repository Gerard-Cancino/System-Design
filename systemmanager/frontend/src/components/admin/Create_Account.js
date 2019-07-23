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
    department: undefined,
    departmentList: undefined,

    user: undefined,

    status: undefined,

    result: undefined,
  }
  componentDidMount(){
    axios
    .get('/department-list.json')
    .then(res=>{
      this.setState({departmentList:res.data.data,department:res.data.data[0].code})
    })
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
    if (this.state.type=='S'){
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
        axios
        .post('/student-list.json',{
          'user_id':res.data.data.id
        })
        .then(res=>{
          this.setState({result:res})
        })
      })
      .catch(err => {
        this.setState({result:err})
      })
    }
    else if (this.state.type=='F'){
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
        country: 'USA',
      })
      .then(res => {
        this.setState({result:res})
        axios
        .post('/faculty-list.json',{
          user_id:res.data.data.id,
          department:this.state.department
        })
        .then(res=>{
          this.setState({result:res})
        })
      })
      .catch(err => {
        this.setState({result:err})
      })
    }
  }
  handleIsStudent = e =>{
    this.setState({type:e.target.value})
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded p-4 m-4">
              <h3 className="text-center">Create Account</h3>
              <label>Type of Account</label>
              <select className="col-md-12 form-control" onChange={this.handleIsStudent}>
                <option value='S'>Student</option>
                <option value='F'>Faculty</option>
              </select>
              <br />
              {this.state.type=='S'?(
                <form className="row" onSubmit={this.createAccount}>
                  <div className="col-md-12">
                    <label>Username</label>
                    <input className="form-control" name="email" onChange={this.handleChange} placeholder="username" required/>
                    <br />
                  </div>
                  <div className="col-md-12">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="password" required/>
                    <p className="text-secondary">Needs 1 Special character and a number</p>
                    <p className="text-secondary">Minimum length is 8</p>
                    <br />
                  </div>
                  <div className="col-md-12">
                    <label>Email</label>
                    <input type="email" className="form-control" name="second_email" onChange={this.handleChange}  placeholder="email@email.com" required/>
                    <br />
                  </div>
                  <div className="col-md-6">
                    <label>First Name</label>
                    <input className="form-control" name="firstName" onChange={this.handleChange}  placeholder="Bob" required/>
                    <br />
                  </div>
                  <div className="col-md-6">
                    <label>Last Name</label>
                    <input className="form-control" name="lastName" onChange={this.handleChange} placeholder="DeBuilding" required/>
                    <br />
                  </div>
                  <div className="col-md-8">
                    <label>Street Address</label>
                    <input className="form-control" name="address" onChange={this.handleChange}  placeholder="123 1 St" required/>
                    <br />
                  </div>
                  <div className="col-md-4">
                    <label>City</label>
                    <input className="form-control" name="city" onChange={this.handleChange}  placeholder="City" required/>
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
                    <input className="form-control" name="zipCode" onChange={this.handleChange}  placeholder="12345" required/>
                    <br />
                  </div>
                  <div className="col-md-5">
                    <label>Phone Number</label>
                    <input className="form-control" name="phoneNumber" onChange={this.handleChange}  placeholder="1234567890" required/>
                    <br />
                  </div>
                  <div className="col-md-12">
                    <button className="form-control btn btn-info" type="submit">Create Account</button>
                  </div>
                </form>
              ):(
                <form className="row" onSubmit={this.createAccount}>
                  <div className="col-md-12">
                    <label>Username</label>
                    <input className="form-control" name="email" onChange={this.handleChange}  placeholder="username" required/>
                    <br />
                  </div>
                  <div className="col-md-12">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={this.handleChange}  placeholder="password" required/>
                    <p className="text-secondary">Needs 1 Special character and a number</p>
                    <p className="text-secondary">Minimum length is 8</p>
                    <br />
                  </div>
                  <div className="col-md-12">
                    <label>Email</label>
                    <input type="email" className="form-control" name="second_email" onChange={this.handleChange}  placeholder="email@email.com" required/>
                    <br />
                  </div>
                  <div className="col-md-6">
                    <label>First Name</label>
                    <input className="form-control" name="firstName" onChange={this.handleChange} placeholder="Bob" required/>
                    <br />
                  </div>
                  <div className="col-md-6">
                    <label>Last Name</label>
                    <input className="form-control" name="lastName" onChange={this.handleChange}  placeholder="DeBuilder" required/>
                    <br />
                  </div>
                  <div className="col-md-8">
                    <label>Street Address</label>
                    <input className="form-control" name="address" onChange={this.handleChange}  placeholder="123 1 St." required/>
                    <br />
                  </div>
                  <div className="col-md-4">
                    <label>City</label>
                    <input className="form-control" name="city" onChange={this.handleChange}  placeholder="city" required/>
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
                    <input className="form-control" name="zipCode" onChange={this.handleChange}  placeholder="12345" required/>
                    <br />
                  </div>
                  <div className="col-md-4">
                    <label>Phone Number</label>
                    <input className="form-control" name="phoneNumber" onChange={this.handleChange}  placeholder="1234567890" required/>
                    <br />
                  </div>
                  <div className="col-md-4">
                    <label>Department</label>
                    <select className="form-control" name="department" onChange={this.handleChange}>
                      {this.state.departmentList.map(el=>(
                        <option value={el.code} key={el.code}>{el.name}</option>
                      ))}
                    </select>
                    <br />
                  </div>
                  <div className="col-md-12">
                    <button className="form-control btn btn-info" type="submit">Create Account</button>
                  </div>
                </form>
                )}
              </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}

export default CreateAccount;
