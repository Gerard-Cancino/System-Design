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
          <div className="row justify-items-center">
            <div className="col-md-11 round border m-4 p-4">
              <div className="col-md-4 p-4">
                <div className="card">
                  <div className="card-body">
                    <p className="text-center h3"><Link to="/student/view-section-list">View Section List</Link></p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-4">
                <div className="card">
                  <div className="card-body">
                    <p className="text-center h3"><Link to="/student/view-term">View Section List</Link></p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-4">
                <div className="card">
                  <div className="card-body">
                    <p className="text-center h3"><Link to="/student/view-hold-list">View Holds</Link></p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-4">
                <div className="card">
                  <div className="card-body">
                    <p className="text-center h3"><Link to="/student/view-transcript">View Transcript</Link></p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-4">
                <div className="card">
                  <div className="card-body">
                    <p className="text-center h3"><Link to="/student/view-degree-audit">View Degree Audit</Link></p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-4">
                <div className="card">
                  <div className="card-body">
                    <p className="text-center h3"><Link to="/student/view-grade-list">View Current Term's Grades</Link></p>
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
