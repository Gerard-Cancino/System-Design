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
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row m-2 p-4 bg-primary">
                <h3 className="col-md-12 text-center text-white">Courses</h3>
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/create-course">Create Course</Link></p>
                    </div>
                  </div>
                </div>          
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/view-course-list">View Course List</Link></p>
                    </div>
                  </div>
                </div>    
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/view-section-list">Master Schedule</Link></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mx-2 mt-2 p-4 bg-success">
                <h3 className="col-md-12 text-center text-white">Student</h3>
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/register-student-enroll">Enroll Student to Course Section</Link></p>
                    </div>
                  </div>
                </div>     
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/view-add-student-hold">View/Add Student Hold</Link></p>
                    </div>
                  </div>
                </div>                        
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/view-student-degree-audit">View Student Degree Audit</Link></p>
                    </div>
                  </div>
                </div>       
              </div>
              <div className="row mx-2 p-4 bg-success">     
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/view-grade-list">View/Edit Student's Grades</Link></p>
                    </div>
                  </div> 
                </div>            
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/view-student-info">View Student Information</Link></p>
                    </div>
                  </div>
                </div>            
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/view-student-term">View Student's Term</Link></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mx-2 mb-2 p-4 bg-success">
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/view-student-transcript">View Student's Transcript</Link></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="card align-self-center h-100">
                    <div className="card-body">
                      <p className="text-center align-items-center h3 h-100"><Link className="align-self-center h-100" to="/admin/create-account">Create Account</Link></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/admin/assign-student-major-minor">Manage Student Major and Minor</Link></p>
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
