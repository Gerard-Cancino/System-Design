import React, { Component } from 'react';
import {Link } from "react-router-dom";

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import MainImg from '../images/main.jpg';

const MainBackground = {
  backgroundImage:"url(" + MainImg + ")",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height:'800px',
  width:'100%'
}
class Home extends Component {
  render(){
    return(
      <React.Fragment>
        <Header />
        <section id="home" className="container-fluid" style={MainBackground}>>
        </section>
        <section className="container-fluid col-md-12" style={{background: '#fe0000',height:'300px', color:'white'}}>
          <div className="text-center h-100 align-items-center row p-4" >
            <div className="col-md-12">
              <h2><strong>Disclaimer:</strong></h2>
              <p>TODO: Add that this is not a real school. etc...</p>
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
        <section id="languages" className="container-fluid" style={{background: 'blueviolet'}}>
          <div className="row p-4 col-md-12">
            <div className="col-md-4">
              <div className="text-center card" style={{width: '28rem', margin: 'auto'}}>
                <img className="col-md-12 card-img-top img-fluid mx-auto d-block" src={require('../images/django-logo.jpg')}/>
                <div className="col-md-12 card-body">
                  <hr />
                  <h3>Django</h3>
                  <p>TODO: ADD HOW THIS CONNECTS TO PROJECT</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center card" style={{width: '28rem', margin: 'auto'}}>
                <img className="col-md-12 card-img-top img-fluid mx-auto d-block" src={require('../images/react-logo.jpg')}/>
                <div className="col-md-12 card-body">
                  <hr />
                  <h3>React</h3>
                  <p>TODO: ADD HOW THIS CONNECTS TO PROJECT</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center card" style={{width: '28rem', margin: 'auto'}}>
                <img className="col-md-12 card-img-top img-fluid mx-auto d-block" src={require('../images/mysql-logo.jpg')}/>
                <div className="col-md-12 card-body">
                  <hr />
                  <h3>MySQL</h3>
                  <p>TODO: ADD HOW THIS CONNECTS TO PROJECT</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="profile" className="container-fluid" style={{background: '#003366'}}>
          <div className="row p-4 col-md-12">
            <div className="col-md-4">
              <div className="text-center card" style={{width: '28rem', margin: 'auto'}}>
                <img className="col-md-12 card-img-top img-fluid mx-auto d-block" alt="my lovely face"/>
                <div className="col-md-12 card-body">
                  <hr />
                  <h3>Gerard Cancino</h3>
                  <p>TODO: What did we do?</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center card" style={{width: '28rem', margin: 'auto'}}>
                <img className="col-md-12 card-img-top img-fluid mx-auto d-block" alt="my lovely face"/>
                <div className="col-md-12 card-body">
                  <hr />
                  <h3>Dan Dabrowski</h3>
                  <p>TODO: What did we do?</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center card" style={{width: '28rem', margin: 'auto'}}>
                <img className="col-md-12 card-img-top img-fluid mx-auto d-block" alt="my lovely face"/>
                <div className="col-md-12 card-body">
                  <hr />
                  <h3>Haojun Cai</h3>
                  <p>TODO: What did we do?</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="explore" className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <p className="text-center"><strong>About Us</strong></p>
              <p className="text-center">TODO: Description // Not about school about developers</p>
            </div>
            <div className="col-md-4">
              <p className="text-center"><strong>Contact Us</strong></p>
              <p className="text-center">Phone Number: (123) 456 7890</p>
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
