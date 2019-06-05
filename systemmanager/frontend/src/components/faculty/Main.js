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
                <div className="col-md-12 ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/faculty/view-section-list">Master Schedule</Link></p>
                    </div>
                  </div>
                </div>  
              </div>
              <div className="row m-2 p-4 bg-danger">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/faculty/view-advisee-list">View Advisee List</Link></p>
                    </div>
                  </div>
                </div>      
              </div>
              <div className="row m-2 p-4 bg-success">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-center h3"><Link to="/faculty/view-term">Schedule</Link></p>
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
