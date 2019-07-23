import React, { Component } from 'react';
import {Link } from "react-router-dom";
// import Component from '---';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

// Add Grade Too

class AdminSectionDetails extends Component {
  state = {
    section: undefined,
    prerequisiteList:undefined,
    enrollment:undefined,
    result: undefined
  }
  componentDidMount(){
    if(this.props.isEnrolled){
      axios
      .get(`/enrollment-details.json/${this.props.data.state.course_section_id}/${this.props.user}`)
      .then(res=>{
        this.setState({enrollment:res.data.data})
      })
    }
    axios
    .get(`/course-section-details.json/${this.props.data.state.course_section_id}`)
    .then(res=>{
      console.log(res)
      this.setState({section:res.data.data})
      if (this.props.data.state.isEnrolled==true){
        axios
        .get(`/grade-list.json`,{
          params:{
            'student_email':this.props.user,
            'course_section_id':res.data.data.id
          }
        })
        .then(res=>{
          this.setState({gradeList:res.data.data})
        })
      }
      axios
      .get(`/prerequisite-list.json`,{
        params:{
          course: res.data.data.course.id
        }
      })
      .then(res=>{
        this.setState({prerequisiteList: res.data.data})
      })
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        {this.state.section==undefined?(
          <p></p>
        ):(
          <section className="container-fluid h-100">
            <div className="row justify-content-center">
              <div className="col-md-10 border rounded p-4 m-4">
                <h2 className="col-md-12 text-center"><strong>Course Section Details</strong></h2>
                <h3 className="col-md-12"><strong>{this.state.section.course.id} - {this.state.section.course.name}</strong></h3>
                <p className="col-md-12"><strong>Department:</strong> {this.state.section.course.department.name}</p>
                <p className="col-md-12"><strong>Description:</strong> {this.state.section.course.description}</p>
                {this.state.prerequisiteList!=undefined&&this.state.prerequisiteList.length!=0?(
                  <div className="col-md-12">
                    <p><strong>Prerequisites:</strong></p>
                    {this.state.prerequisiteList.map(el=>(
                      <Link to={{
                        pathname: '/admin/view-course-details',
                        state: {courseID: el.prereq.id}
                      }} className="col-md-3 btn btn-info m-1">{el.prereq.name}</Link>
                    ))}
                  </div>
                ):(
                  <p>No Prerequisites</p>
                )}
                <hr />
                <h4 className="col-md-12"><strong>Course Section:</strong> {this.state.section.id}</h4>
                <p className="col-md-12"><strong>Number:</strong> {this.state.section.number}</p>
                <p className="col-md-12"><strong>Professor:</strong> {this.state.section.faculty.user.firstName} {this.state.section.faculty.user.lastName}</p>
                {this.state.enrollment==undefined?(
                  <p></p>
                ):(
                  <p className="col-md-12"><strong>Date of Enrollment:</strong> {this.state.enrollment==undefined?(null):(this.state.enrollment.dateEnrolled)}</p>
                )}
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
              </div>
            </div>
          </section>
        )}
        <Footer />
      </React.Fragment>
    )
  }
}

export default AdminSectionDetails;
