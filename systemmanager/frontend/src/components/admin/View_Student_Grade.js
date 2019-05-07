import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class StudentGrade extends Component {
  state = {
  }

  handleChange = event => {
  }

  handleSubmit = event => {
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

export default StudentGrade;
