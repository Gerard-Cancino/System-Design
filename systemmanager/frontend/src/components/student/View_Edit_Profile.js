import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import ProfileUser from '../general/User_Profile.js';
import ProfileUserEdit from '../general/User_Profile_Edit.js';
import ProfileUserChangePassword from '../general/User_Change_Password.js';

class ViewStudentRecord extends Component {
  state = {
    student : undefined,
    isEdit: false,
    status: undefined,
    advisor: undefined,
  }

  componentDidMount() {
    axios
    .get(`/student-details.json/${this.props.user}`)
    .then(res=>{
      this.setState({account:res.data.user})
    })
    axios
    .get(`/advisor-details.json/${this.props.user}`)
    .then(res => {
      this.setState({advisor:res.data.data})
      this.setState({message:res.data.message})
    })
    .catch(err=>{
      console.log(err)
    })
  }
  handleEdit = (address, city, state, zipCode, phoneNumber) => (event) => {
    event.preventDefault()
    axios
    .put(`/user-details.json/${this.props.user}`,{
      address: address,
      city: city,
      state: state,
      zipCode: zipCode,
      phoneNumber: phoneNumber
    })
    .then(res=>{
      this.setState({
        account: res.data,
        isEdit: false
      })
    })
  }
  handlePassword = (currentPassword, newPassword) => {
    
    console.log('running');
    event.preventDefault();
    axios
    .post('/token-auth',{
      email: this.state.account.email,
      password:currentPassword,
    })
    .then(res=>{
      axios
      .put('/user-password-change',{
        email: this.state.account.email,
        password: newPassword,
      })
      .then(res=>{
        localStorage.removeItem('token')
        window.location.replace('/login')
      })
      .catch(err =>{
        this.setState({status:err})
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }
  handleIsEdit = event => {
    event.preventDefault();
    this.setState({isEdit: true})
  }
  handleIsPassword = event => {
    event.preventDefault();
    this.setState({isPassword: true})
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">My Profile</h2>
            <ProfileUser account={this.state.account} />
            {this.state.advisor==undefined?(
              <p></p>
            ):(
              <p><strong>Academic Advisor:</strong> {this.state.advisor.faculty.user.firstName} {this.state.advisor.faculty.user.lastName}</p>
            )}
            {this.state.isEdit==true?(
              <ProfileUserEdit onSubmit={this.handleEdit.bind(this)} account={this.state.account} />
            ) : (
              <button type="submit" onClick={this.handleIsEdit} className="col-md-12 text-center btn btn-primary">Edit Profile</button>
            )}
            {this.state.isPassword==true?(
              <ProfileUserChangePassword onSubmit={this.handlePassword.bind(this)}/>
            ):(
              <button type="submit" onClick={this.handleIsPassword} className="col-md-12 text-center btn btn-danger">Change Password</button>
            )}            
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewStudentRecord;
