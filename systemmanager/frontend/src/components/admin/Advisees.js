import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import Exception from  '../general/Error_Handler.js';

class ViewAdviseeDetails extends Component {
  state = {
    student: undefined,
    faculty: undefined,
    adviseeString: undefined,
    advisor: undefined,
    result: undefined
  }
  handleStudent = (event) => {
    this.setState({ student: event.target.value || undefined});
  }
  handleFaculty = (event) => {
    this.setState({ faculty: event.target.value || undefined});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
    .get(`/advisee-details.json/${this.state.faculty}`)
    .then(res => {
      this.setState({
        result: res,
        adviseeString: res.data.data
      })
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header username={this.props.user}/>
        <section className="container-fluid h-100">
          <Exception res={this.state.result} />
          <div className="row border rounded m-4 p-4 h-100">
          <h2 className="col-md-12 text-center">Search Advisors</h2>
          <form className="col-md-12" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="facultyName">Enter Faculty email</label>
              <input type="text" className="form-control" id="facultyid" placeholder="Enter Faculty ID" onChange={this.handleFaculty}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          {this.state.adviseeString==undefined?(
            <p></p>
          ):(
            <div>
              <br></br>
              <h4>Advisor: {this.state.adviseeString.faculty.user.id}, {this.state.adviseeString.faculty.user.lastName}, {this.state.adviseeString.faculty.user.firstName}</h4>
              <p>Advisee: {this.state.adviseeString.student.user.firstName}, {this.state.adviseeString.student.user.lastName}</p>
            </div>

          )}

          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default ViewAdviseeDetails;
