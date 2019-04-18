import React, { Component } from 'react';
import {Link } from "react-router-dom";

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class Main extends Component {
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid">
          <div className="row">
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/faculty/view-course-list">View Course List</Link></p>
                </div>
              </div>
            </div> 
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/faculty/view-advisee-list">View Advisee List</Link></p>
                </div>
              </div>
            </div> 
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/faculty/search-student-advisor">Search Student Advisor</Link></p>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/faculty/view-office-hours">View Office Hours</Link></p>
                </div>
              </div>
            </div> 
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/faculty/declare-student-major-minor">Declare Student's Major or Minor</Link></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Main;
