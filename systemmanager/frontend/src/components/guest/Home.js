import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';

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
  componentDidMount(){
    axios
    .post('/user-list.json',{
      email: 'toothQ',
      password: 'password',
      firstName: 'Tooth',
      lastName: 'Q',
      address: 'Random',
      city: 'Floral Park',
      state: 'NY',
      zipCode: '11111',
      phoneNumber: '1234567890',
      type: 'A',
      country: 'USA'
    })
    .then(res => {
      if(res.status==400){
        this.setState({
          status: res.status
        })
      }
      else {
        this.setState({
          user: res.data,
          status: res.status
        })
      }
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid" style={MainBackground}>
          <span id="home" style={{paddingTop:'40px'}}></span>
        </section>
        <section className="container-fluid col-md-12" style={{background: '#fe0000',height:'300px', color:'white'}}>
          <div className="text-center h-100 align-items-center row p-4" >
            <div className="col-md-12">
              <h2><strong>Disclaimer:</strong></h2>
              <p>TODO: Add that this is not a real school. etc...</p>
            </div>
          </div>
        </section>
        <section className="container-fluid">
          <span id="calendar" style={{paddingTop:'40px'}}></span>
          <div className="row pt-4 pb-4">
            <div className="col-md-12">
              <h2 className="text-center col-md-12 mb-4">View Academic Calendar</h2>
              <div id="accordian">
                <div className="card">
                  <div className="card-header col-md-12 align-items-center" id="spring2019Header">
                    <button className="col-md-12 btn btn-link" data-toggle="collapse" data-target="#spring2019Body" aria-expanded="false" aria-controls="spring2019Body">
                      <h4 className="mb-0">Spring 2019</h4>
                    </button>
                  </div>
                  <div id="spring2019Body" className="collapse" aria-labelledby="spring2019Header" data-parent="#accordian">
                    <div className="card-body offset-md-3 col-md-6">
                      <table className="table table-striped">
                        <thead style={{backgroundColor:"#696969", color:"white"}}>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0"><strong>Date</strong></p></td>
                            <td  className="col-md-6"><p className="mb-0"><strong>Event</strong></p></td>
                          </tr>
                        </thead>
                        <tbody className="col-md-12">
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Jan 17 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Advising for all students 10AM - 7PM</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Jan 18 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Advising for all students 10AM - 4PM</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Jan 21 2019</p></td>
                            <td  className="col-md-6">
                              <p className="mb-0">Residence Halls open</p>
                              <p className="mb-0">Martin Luther King, Jr. Birthday observed</p>
                              <p className="mb-0">No classes</p>
                              <p className="mb-0">offices closed></p>
                            </td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Jan 22 2019</p></td>
                            <td  className="col-md-6">
                              <p className="mb-0">Spring 2019 Classes begin</p>
                              <p className="mb-0">Add/Drop (no fee) /Late Registration ($50 fee) on the Web</p>
                            </td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Feb 18 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">President’s Day – no classes; offices closed</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Mar 4 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Advising beings in department offices for Fall 2019 registration</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Mar 11 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Mid-term week</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Mar 16 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Dining Hall closes after breakfast</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Mar 18 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Spring recess</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Mar 24 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Dining Hall reopens for dinner</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Mar 25 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Classes resume</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Mar 27 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Mid-term grades due</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Apr 1 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Fall 2019 registration for Seniors on the Web</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Apr 4 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Fall 2019 registration for juniors on the Web </p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Apr 8 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Fall 2019 registration for sophomores on the Web</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Apr 11 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Fall 2019 registration for freshmen on the Web</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Apr 12 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Continual registration for Fall 2019 for all students on the Web</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Apr 25 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Honors Convocation – classes cancelled from 2 P.M. – 6 P.M.</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">May 8 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Make-up Day for Monday/Wednesday classes</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">May 9 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Make-up Day for Tuesday classes</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">May 10 2019 - May 16 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Examinations week Grades due 48 hours after final examination)</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">May 16 2019 </p></td>
                            <td  className="col-md-6">
                              <p className="mb-0">Spring semester ends after last examination</p>
                              <p className="mb-0">Residence halls close at 10 p.m. for undergraduates</p>
                            </td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">May 18 2019 </p></td>
                            <td  className="col-md-6">
                              <p className="mb-0">Graduating students check out of Residence Halls at 3 P.M.</p>
                              <p className="mb-0">Commencement</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-header col-md-12 align-items-center" id="fall2019Header">
                    <button className="col-md-12 btn btn-link" data-toggle="collapse" data-target="#fall2019Body" aria-expanded="false" aria-controls="fall2019Body">
                      <h4 className="mb-0">Fall 2019</h4>
                    </button>
                  </div>
                  <div id="fall2019Body" className="collapse" aria-labelledby="fall2019Header" data-parent="#accordian">
                    <div className="card-body offset-md-3 col-md-6">
                      <table className="table table-striped">
                        <thead style={{backgroundColor:"#696969", color:"white"}}>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0"><strong>Date</strong></p></td>
                            <td  className="col-md-6"><p className="mb-0"><strong>Event</strong></p></td>
                          </tr>
                        </thead>
                        <tbody className="col-md-12">
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Aug 24 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Residence halls open for all new students</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Aug 25 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Residence halls open for all returning students</p></td>
                          </tr>
                          <tr className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Aug 26 2019</p></td>
                            <td  className="col-md-6">
                              <p className="mb-0">Classes begin</p>
                              <p className="mb-0">Add/Drop(no fee)/Late Registration ($50 fee)on the Web</p>
                            </td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Jan 22 2019</p></td>
                            <td  className="col-md-6">
                              <p className="mb-0">Spring 2019 Classes begin</p>
                              <p className="mb-0">Add/Drop (no fee) /Late Registration ($50 fee) on the Web</p>
                            </td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Sep 2 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Labor Day observed- no classes offices closed</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Oct 1 2019</p></td>
                            <td  className="col-md-6">
                              <p className="mb-0">Applications for graduation (Registrar’s Office) due from candidates expecting to complete requirements by December 2019</p>
                              <p className="mb-0">Advising begins in department offices for Spring 2020 registration (By appointment)</p>
                            </td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Oct 14 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Columbus Day observed – no classes offices closed</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Oct 21 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Mid-term week</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Oct 30 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Mid-term grades due</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Nov 4 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Spring 2020 registration for seniors on the Web</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Nov 5 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Election Day – classes in session; offices minimally staffed</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Nov 7 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Spring 2020 registration for juniors on the Web</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Nov 11 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Spring 2020 registration for sophomores on the Web</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Nov 14 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Spring 2020 registration for freshmen on the Web</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Nov 15 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Continual registration for Spring 2020 for all students on the Web</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Nov 27 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Dining Hall closes after dinner</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Nov 28 2019 - Dec 1 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Thanksgiving Recess (begins after last class Wednesday)</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Dec 1 2019 </p></td>
                            <td  className="col-md-6"><p className="mb-0">Dining Hall reopens for dinner</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Dec 2 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Classes resume</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Dec 11 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Make-up /Study Days for Monday/Wednesday</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Dec 12 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Make-up /Study Days for Tuesday/Thursday</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Dec 14 2019 - Dec 20 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Examinations week (Grades due 48 hours after final exams)</p></td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Dec 20 2019</p></td>
                            <td  className="col-md-6">
                              <p className="mb-0">Fall semester ends after last examination</p>
                              <p className="mb-0">Residence Halls close at 10 P.M.</p>
                            </td>
                          </tr>
                          <tr  className="col-md-12">
                            <td  className="col-md-6"><p className="mb-0">Dec 25 2019</p></td>
                            <td  className="col-md-6"><p className="mb-0">Christmas Day – no classes; offices closed</p></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="container-fluid">
          <span id="explore" style={{paddingTop:'40px'}}></span>
          <div className="row pt-4 pb-4">
            <h2 className="text-center col-md-12 mb-4">Explore</h2>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h3 className="text-center mb-0"><Link to="/course-catalog">View Catalog</Link></h3>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h3 className="text-center mb-0"><Link to="/master-schedule">Search Master Schedule</Link></h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container-fluid" style={{background: 'blueviolet'}}>
          <span id="languages" style={{paddingTop:'40px'}}></span>
          <div className="row pt-4 pb-4">
            <div className="col-md-4">
              <div className="text-center card p-4 m-4">
                <img className="col-md-12 card-img-top img-fluid mx-auto d-block" src={require('../images/django-logo.jpg')}/>
                <div className="col-md-12 card-body">
                  <hr />
                  <h3>Django</h3>
                  <p>TODO: ADD HOW THIS CONNECTS TO PROJECT</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center card p-4 m-4">
                <img className="col-md-12 card-img-top img-fluid mx-auto d-block"src={require('../images/react-logo.jpg')}/>
                <div className="col-md-12 card-body">
                  <hr />
                  <h3>React</h3>
                  <p>TODO: ADD HOW THIS CONNECTS TO PROJECT</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center card p-4 m-4">
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
        <section className="container-fluid" style={{background: '#003366'}}>
          <span id="profile" style={{paddingTop:'40px'}}></span>
          <div className="row pt-4 pb-4">
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
        <section id="contact" className="container-fluid">
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
