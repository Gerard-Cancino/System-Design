import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class LockUnlockUserAccount extends Component {
  state = {
    username: '',
    user: {},
    isLoaded: false,
    isLocked: '',
  }
  handleChange = event => {
    this.setState({ username: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log("is submitting");
    axios
      .get(`/user-details.json/${this.state.username}`)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
  }
  handleSubmit0 = event => {
    event.preventDefault();
    axios
      .put(`/user-details.json/${this.state.username}`, {
        params: {
          'isLockout': false,
        }
      })
      .then(res => {
        this.setState({
          user: res.data
        })
      })
  }  
  handleSubmit1 = event => {
    event.preventDefault();
    axios
      .put(`/user-details.json/${this.state.username}`,{
        params:{
          'isLockout': true,
        }
      })
      .then(res => {
        this.setState({
          user: res.data
        })
      })
  }

  render(){
    const Info = () =>
      !this.state.user.length?(
        this.state.isLoaded?(
          <p>Could not find user</p>
        ) : (
          <p></p>
        )
      ) : (
        this.state.isLocked?(
          <div>
            <p>{this.state.user.firstName} {this.state.user.LastName}</p>
            <p>Account is locked</p>
            <form className="col-md-12">
              <div className="form-group"> 
                <button onClick={this.handleSubmit0} type="submit" className="btn btn-primary">Unlock Account</button> 
              </div>
            </form>
          </div>
        ) : (
        <div>
          <p>{this.state.user.firstName} {this.state.user.LastName}</p>
          <p>Account is not locked</p>
          <form className="col-md-12">
            <div className="form-group">
              <button onClick={this.handleSubmit1} type="submit" className="btn btn-primary">Lock Account</button> 
            </div>
          </form>
        </div>
        )
      );
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">Lock or Unlock User Account</h2>
            <form className="col-md-12" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username"></label>
                <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={this.handleChange}/>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
            <Info data={this.state}/>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default LockUnlockUserAccount;
