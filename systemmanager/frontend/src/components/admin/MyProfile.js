import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import ProfileUser from '../general/User_Profile.js';
import ProfileUserEdit from '../general/User_Profile_Edit.js';

class ViewStudentRecord extends Component {
  state = {
    account : undefined,
    isEdit: false,
  }

  componentDidMount() {
    axios
    .get(`/user-details.json/${this.props.user}`)
    .then(res=>{
      this.setState({account:res.data})
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
  handleSubmit = event => {
    event.preventDefault();
    this.setState({isEdit: true})
  }
  render(){
    console.log("reloading page");
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">My Profile</h2>
            <ProfileUser account={this.state.account} />
            {this.state.isEdit==true?(
              <ProfileUserEdit onSubmit={this.handleEdit.bind(this)} account={this.state.account} />
            ) : (
              <button type="submit" onClick={this.handleSubmit} className="col-md-12 text-center btn btn-primary">Edit Profile</button>
            )}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewStudentRecord;
