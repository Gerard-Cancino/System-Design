import React, { Component } from 'react';
import {Link } from "react-router-dom";

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class Home extends Component {
  render(){
    return(
      <React.Fragment>
        <Header/>
        <section id="home" className="container-fluid">
          <div className="row">
          </div>
        </section>
        <section id="review" className="container-fluid">
          <div className="row p-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Review #1</h5>
                  <p className="card-text">Description</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Review #2</h5>
                  <p className="card-text">Description</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Review #3</h5>
                  <p className="card-text">Description</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="explore" className="container-fluid">
          <div className="row p-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><a>View Academic Calendar</a></p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/course-catalog">View Catalog</Link></p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                <p className="text-center h3"><Link to="/master-schedule">Search Master Schedule</Link></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="explore" className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <p className="text-center"><strong>About Us</strong></p>
              <p className="text-center">TODO: Description</p>
            </div>
          </div>
          <div id="aboutus" className="row">
            <div className="col-md-12 pb-0">
              <p className="text-center"><strong>Contact Us</strong></p>
              <p className="text-center">Phone Number: (123) 456 7890</p>
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="text-center">Address: </p>
              <p className="text-center">Address Line 1</p>
              <p className="text-center">City, State Zip</p>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
