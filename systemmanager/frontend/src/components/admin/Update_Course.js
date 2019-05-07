import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from "axios";
// import Component from '---';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class UpdateCourse extends Component {
  state = {
    courseID:undefined,
    course:undefined,
    courseName:undefined,
    courseDescription:undefined,
    courseCredits:undefined,
    status:undefined
  }
  componentDidMount(){
    this.setState({courseID:this.props.data.state.courseID})
    axios
    .get(`/course-details.json/${this.props.data.state.courseID}`)
    .then(res=>{
      this.setState({course:res.data})
    })
  }
  handleCourseName = (event) => {
    this.setState({courseName:event.target.value||undefined})
  }
  handleCourseDescription=(event)=>{
    this.setState({courseDescription:event.target.value||undefined})
  }
  handleCourseCredits=(event)=>{
    this.setState({credits:event.target.value||undefined})
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    axios
    .put(`/course-details.json/${this.state.course.id}`,{
      name:this.state.courseName,
      description:this.state.courseDescription,
      numberOfCredits:this.state.numberOfCredits
    })
    .then(res=>{
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row h-100 p-4 m-4 border rounded">
            <h2 className="col-md-12 text-center">Update Course</h2>
          {this.state.course==undefined?(
            <p></p>
          ):(
            <form className="col-md-12">
              <div className="form-group col-md-12">
                <label>Course Name</label>
                <input className="form-control" onChange={this.handleCourseName} placeholder={this.state.course.name}/>
              </div>
              <div className="form-group col-md-12">
                <label>Course Description</label>
                <textarea className="form-control" onChange={this.handleCourseDescription} placeholder={this.state.course.description}/>
              </div>
              <div className="form-group col-md-12">
                <label>Course Credits</label>
                <input className="form-control" onChange={this.handleCourseCredits} placeholder={this.state.course.numberOfCredits}/>
              </div>
              <button className="btn btn-primary col-md-12">Update Course</button>
            </form>
          )}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}

export default UpdateCourse;
