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
    courseIsInCatalog: undefined,
    result: undefined
  }
  componentDidMount(){
    this.setState({courseID:this.props.data.state.courseID})
    axios
    .get(`/course-details.json/${this.props.data.state.courseID}`)
    .then(res=>{
      this.setState({course:res.data.data,courseIsInCatalog:res.data.data.isInCatalog})
    })
  }
  handleCourseName = (event) => {
    this.setState({courseName:event.target.value||undefined})
  }
  handleCourseDescription=(event)=>{
    this.setState({courseDescription:event.target.value||undefined})
  }
  handleCourseCredits=(event)=>{
    this.setState({courseCredits:event.target.value||undefined})
  }
  handleIsInCatalog=(e)=>{
    if (e.target.value=="true")
      this.setState({courseIsInCatalog:true})
    else
      this.setState({courseIsInCatalog:false})
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    axios
    .put(`/course-details.json/${this.state.course.id}`,{
      name:this.state.courseName,
      description:this.state.courseDescription,
      numberOfCredits:this.state.courseCredits,
      isInCatalog: this.state.courseIsInCatalog
    })
    .then(res=>{
      this.setState({result:res})
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result}/>
        <section className="container-fluid h-100">
          <div className="row h-100 p-4 m-4 border rounded">
            <div className="col-md-12">
              {this.state.status==undefined?(
                <p></p>
              ):(
                <h3 className="col-md-3 float-left">Successfully Updated!</h3>
              )}
              <Link to={{
                pathname: '/admin/add-prerequisite',
                state: {
                  courseID:this.state.courseID
                }
              }} className="col-md-2 btn btn-success float-right">Add Prerequisites</Link>
            </div>
            <h2 className="col-md-12 text-center">Update Course</h2>
          {this.state.course==undefined?(
            <p></p>
          ):(
            <form className="col-md-12" onSubmit={this.handleSubmit}>
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
              <div className="form-group radio col-md-12">
                <label>Course is in Catalog?</label>
                <label>
                  <input type="radio" value={true} checked={this.state.courseIsInCatalog == true} onChange={this.handleIsInCatalog}/>
                  True
                </label>
                <label>
                  <input type="radio" value={false} checked={this.state.courseIsInCatalog == false} onChange={this.handleIsInCatalog}/>
                  False   
                </label>
              </div> 
              <button className="btn btn-primary col-md-12" type="submit">Update Course</button>
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
