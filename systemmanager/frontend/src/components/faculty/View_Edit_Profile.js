import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import ProfileUser from '../general/User_Profile.js';
import ProfileUserEdit from '../general/User_Profile_Edit.js';
import ProfileUserChangePassword from '../general/User_Change_Password.js';

class ViewEditProfile extends Component {
  state = {
    account : undefined,
    isEdit: false,
    result: undefined
  }
  componentDidMount() {
    axios
    .get(`/user-details.json/${this.props.user}`)
    .then(res=>{
      this.setState({account:res.data.data})
    })
  }
  handleEdit = (address, city, state, zipCode, phoneNumber,second_email) => (event) => {
    event.preventDefault()
    axios
    .put(`/user-details.json/${this.props.user}`,{
      address: address,
      city: city,
      state: state,
      zipCode: zipCode,
      phoneNumber: phoneNumber,
      second_email: second_email,
    })
    .then(res=>{
      this.setState({
        account: res.data.data,
        isEdit: false,
        result:res
      })
    })
    .catch(err=>{
      this.setState({
        result:err
      })
    })
  }
  handlePassword = (currentPassword, newPassword) => {
    event.preventDefault();
    if (currentPassword == newPassword) {
      this.setState({result:{response:
        {data:
          {message:"The new password cannot be the same as the old password"},
          status:400
        }
      }})
    }
    else{
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
          this.setState({result:res})
          localStorage.removeItem('token')
          window.location.replace('/login')
        })
        .catch(err =>{
          this.setState({result:err})
        })
      })
      .catch(err=>{
        this.setState({result:{response:
          {data:
            {message:"The old password is incorrect"},
            status:400
          }
        }})
      })
    }
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
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4">
            <h2 className="col-md-12 text-center">My Profile</h2>
            <ProfileUser account={this.state.account} />
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

export default ViewEditProfile;
