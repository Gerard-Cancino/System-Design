import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewStudentRecord extends Component {
  state = {
    studentUsername: '',
    student: '',
    placeholder: '',
    advisor: '',
    isLoaded: false
  }

  handleChange = event => {
    this.setState({ studentUsername: event.target.value });
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

  render(){
    console.log("reloading page");
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
            {this.state.student? (
              <Info data={this.state} />
            ) : (
              <p></p>
            )}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

const Info = ({data}) =>
  data.student ==''?(
    <p>Could not find student</p>
  ) : (
    data.student.user.type!='S'?(
      <p>The user is not a student.</p>
    ) : ( 
      <div>
        <h4><strong>{data.student.user.firstName} {data.student.user.lastName}</strong></h4>
        <p>{data.student.user.addLine} {data.student.user.city}</p>
        <p>{data.student.user.state} {data.student.user.zipCode} </p>
        <p>{data.student.user.country}</p>
        <p>{data.student.user.phoneNumber}</p>

        {data.advisor==''?(
          <p>The student is not assigned to an adviser.</p>
        ) : (
          <div>
            <h4>Advisor: </h4>
            <p>{data.advisor.faculty.user.firstName} {data.advisor.faculty.user.lastName}</p>
            <p>{data.advisor.faculty.user.email}@garageuniversity.me</p>
          </div>
        )}
      </div>
    )
  );

export default ViewStudentRecord;
