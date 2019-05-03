import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import ProfileUser from '../general/User_Profile.js';
import StudentAdvisor from '../general/Student_Advisor.js';

class ViewStudentRecord extends Component {
  state = {
    studentUsername: undefined,
    student: undefined,
    placeholder: undefined,
    advisor: undefined,
    isLoaded: false
  }

  handleChange = event => {
    this.setState({ studentUsername: event.target.value || undefined});
    //console.log(this.state.studentUsername);
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .get(`/student-details.json/${this.state.studentUsername}`)
      .then(res => {
        this.setState({
          student: res.data,
          isLoaded: true
        })
      })
    axios
      .get(`/advisor-details.json/${this.state.studentUsername}`)
      .then( res=> {
        this.setState({
          advisor: res.data,
        })
      })
  }
  handleSubmit0 = event => {
    event.preventDefault();
    axios
      .put(`/user-details.json/${this.state.studentUsername}`, {
        'isLockout': false,
      })
      .then(res => {    
        axios
        .get(`/student-details.json/${this.state.studentUsername}`)
        .then(res => {
          this.setState({
            student: res.data,
            isLoaded: true
        })
      })
    })
  }  
  handleSubmit1 = event => {
    event.preventDefault();
    axios
      .put(`/user-details.json/${this.state.studentUsername}`,{
        'isLockout': true,
      })
      .then(res => {
        axios
        .get(`/student-details.json/${this.state.studentUsername}`)
        .then(res => {
          this.setState({
            student: res.data,
            isLoaded: true
        })
      })
    })
  }


  render(){
    const Lock = () =>
      this.state.student.user.isLockout==true?(
        <div className="col-md-12">
          <hr />
          <form className="col-md-12">
            <div className="form-group col-md-12"> 
              <button onClick={this.handleSubmit0} type="submit" className="col-md-12 btn btn-success">Unlock Account</button> 
            </div>
          </form>
        </div>
      ) : (
        <div className="col-md-12">
          <hr />
          <form className="col-md-12">
            <div className="form-group col-md-12">
              <button onClick={this.handleSubmit1} type="submit" className="col-md-12 btn btn-danger">Lock Account</button> 
            </div>
          </form>
        </div>
      );
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">View Student Information</h2>
            <form className="col-md-12" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentUsername"></label>
                <input type="text" className="form-control" id="studentUsername" placeholder="Enter Student's Username" onChange={this.handleChange}/>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button> 
              </div>
            </form>
            {!this.state.student?(
              <p></p>
            ) : (
              <div className="col-md-12">
                <ProfileUser account={this.state.student.user} />
                <hr />
                <StudentAdvisor advisor={this.state.advisor} />
                <Lock/>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default ViewStudentRecord;
