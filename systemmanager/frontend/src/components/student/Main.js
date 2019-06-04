import React, { Component } from 'react';
import {Link } from "react-router-dom";

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class Main extends Component {
  render(){
    return(
      <React.Fragment>
        <Header username={this.props.user}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row m-2 p-4 bg-info">
                <h3 className="col-md-12 text-center text-white">Student Account</h3>
                <div className="col-md-6 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/student/view-info">View Information</Link></p>
                    </div>
                  </div>
                </div>    
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/student/view-hold-list">View Holds</Link></p>
                    </div>
                  </div>
                </div>    
              </div>
              <div className="row m-2 p-4 bg-danger">
                <h3 className="col-md-12 text-center text-white">Student Academic Information</h3>
                <div className="col-md-6 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/student/view-transcript">View Transcript</Link></p>
                    </div>
                  </div>
                </div>    
                <div className="col-md-6 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/student/view-degree-audit">View Degree Audit</Link></p>
                    </div>
                  </div>
                </div>    
              </div>
              <div className="row m-2 p-4 bg-success">
                <h3 className="col-md-12 text-center text-white">Student Registration</h3>
                <div className="col-md-6 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/student/view-section-list">View Master Schedule</Link></p>
                    </div>
                  </div>
                </div>    
                <div className="col-md-6 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/student/register-enroll">Enroll in a Section</Link></p>
                    </div>
                  </div>
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
