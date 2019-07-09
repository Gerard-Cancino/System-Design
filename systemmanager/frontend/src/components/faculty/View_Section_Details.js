import React, { Component } from 'react';
import {Link } from "react-router-dom";
// import Component from '---';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

// Add Grade Too
function checkTerm() {
  let today = new Date();
  let year = parseInt(today.getFullYear());
  // Spring november 4 2019 to january 27 2020
  // Fall April 1 to Sept 1
  // Fall + Spring
  let month = parseInt(today.getMonth());
  // Spring
  if((month>=1&&month<=7)){
    let beginTerm = new Date((year),'10','04');
    let endTerm = new Date(year+1,'01','27');
    console.log(beginTerm)
    console.log(endTerm)
    if(beginTerm<today<endTerm){
      return ({season: 'SP',year:year});
    }
  }
  // Fall
  else if((month>=8&&month<=12)){
    let beginTerm = new Date(year,'03','01');
    let endTerm = new Date(year,'09','01');
    console.log(beginTerm)
    console.log(endTerm)
    if(beginTerm<today<endTerm){
      return ({season: 'F',year:year});
    }
  }
  return undefined;
}




class SectionDetails extends Component {
  state = {
    section: undefined,
    result: undefined,
    doesMatch:false,
  }
  componentDidMount(){
    axios
    .get(`/course-section-details.json/${this.props.data.state.courseSectionID}`)
    .then(res=>{
      this.setState({section:res.data.data})
      this.shouldMatchDate(res.data.data)
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  shouldMatchDate(section){
    const today = new Date();
    let isMatch = false;
    for (let slot of section.slot)
      if (slot.day.id==today.getDay())
        isMatch = true;
    let term = checkTerm()
    if(section.term.season==term.season&&section.term.year==term.year){
      isMatch=false;
    }
    this.setState({doesMatch:isMatch})
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        {this.state.section==undefined?(
          <p></p>
        ):(
          <section className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10 border rounded p-4 m-4">
                <h2 className="col-md-12 text-center"><strong>Course Section Details</strong></h2>
                <h3 className="col-md-12"><strong>{this.state.section.course.id} - {this.state.section.course.name}</strong></h3>
                <p className="col-md-12"><strong>Department:</strong> {this.state.section.course.department.name}</p>
                <p className="col-md-12"><strong>Description:</strong> {this.state.section.course.description}</p>
                <hr />
                <h4 className="col-md-12"><strong>Course Section:</strong> {this.state.section.id}</h4>
                <p className="col-md-12"><strong>Number:</strong> {this.state.section.number}</p>
                <p className="col-md-12"><strong>Professor:</strong> {this.state.section.faculty.user.firstName} {this.state.section.faculty.user.lastName}</p>
                <div className="col-md-12">
                  <p><strong>Seats</strong></p>
                  <p className="col-md-4">Available: {this.state.section.numOfSeats - this.state.section.numOfTaken}</p>
                  <p className="col-md-4">Seats Taken: {this.state.section.numOfTaken}</p>
                  <p className="col-md-4">Seats Total: {this.state.section.numOfSeats}</p>
                </div>
                <p className="col-md-12"><strong>Location:</strong> {this.state.section.room.building.name} - {this.state.section.room.id}</p>
                <p className="col-md-12"><strong>Term:</strong> {this.state.section.term.season=='F'?('Fall'):('Spring')} {this.state.section.term.year}</p>
                <div className="col-md-12">
                  <p><strong>Slot:</strong></p>
                  {this.state.section.slot.length==0?(
                    <p className="col-md-12">No time slots assigned</p>
                  ):(
                    this.state.section.slot.map(el=>(
                      <p className="col-md-12">{el.day.name} {el.time.start} - {el.time.end}</p>
                    ))
                  )}
                </div>

                {this.state.gradeList==undefined?(
                  <p></p>
                ):(
                  <div className="col-md-12">
                    <p><strong>Grades</strong></p>
                    {this.state.gradeList.length==0?(
                      <p className="col-md-12">No Grades were assigned</p>
                    ):(
                      <div className="col-md-12 p-0 m-0">
                        {this.state.gradeList.map(el=>(
                          <p className="col-md-6">{el.type=='F'?('Final'):('Midterm')}: {el.letterGrade}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <Link to={{
                  pathname:"/faculty/view-enrollment-list",
                  state:{
                    courseSectionID:this.props.data.state.courseSectionID
                  }
                }} className="col-md-6 btn btn-primary">View Class Roster</Link>
                {!this.state.doesMatch?(
                  <button className="col-md-6 btn btn-danger" disabled>Disabled Assign Attendance</button>
                ):(
                  <Link to={{
                    pathname:"/faculty/assign-student-attendance",
                    state:{
                      courseSectionID:this.props.data.state.courseSectionID
                    }
                  }} className="col-md-6 btn btn-danger">Assign Attendance</Link>
                )}
              </div>
            </div>
          </section>
        )}
        <Footer />
      </React.Fragment>
    )
  }
}

export default SectionDetails;
