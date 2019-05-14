import React, { Component } from 'react';
import {Link } from "react-router-dom";

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class Main extends Component {
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid d-flex align-items-stretch">
          <div className="row">
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/create-course">Create Course</Link></p>
                </div>
              </div>
            </div>            
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/register-student-enroll">Enroll Student to Course Section</Link></p>
                </div>
              </div>
            </div>               
             <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/update-student-grade">Update Student Grade</Link></p>
                </div>
              </div>
            </div>           
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/view-add-student-hold">View/Add Student Hold</Link></p>
                </div>
              </div>
            </div>            
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/view-course-list">View Course List</Link></p>
                </div>
              </div>
            </div>                       
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/view-student-degree-audit">View Student Degree Audit</Link></p>
                </div>
              </div>
            </div>            
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/view-edit-student-grade">View/Edit Student's Grades</Link></p>
                </div>
              </div>
            </div>            
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/view-student-info">View Student Information</Link></p>
                </div>
              </div>
            </div>            
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/view-student-term">View Student's Term</Link></p>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-4">
              <div className="card">
                <div className="card-body">
                  <p className="text-center h3"><Link to="/admin/view-section-list">Master Schedule</Link></p>
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
