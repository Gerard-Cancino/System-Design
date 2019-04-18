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
                  <p className="text-center h3"><Link to="/admin/view-student-information">View Student Information</Link></p>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/view-student-hold">View/Remove Student Hold</Link></p>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/add-student-hold">Add Student Hold</Link></p>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/lock-unlock-user-account">Lock/Unlock User Account</Link></p>
                </div>
              </div>
            </div> <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/view-master-schedule">Master Schedule</Link></p>
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
