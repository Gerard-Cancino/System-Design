import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import CreateCourseForm from '../general/forms/Create_Course_Form.js';
import AddPrereq from './Add_Prereq.js';

// need to add prereq
class CreateCourse extends Component {
  state = {
    department: undefined,
    departmentList: undefined,
    courseID: undefined,
    courseList: undefined,
    description: undefined,
    courseName: undefined,
    numOfCredits: undefined,
    isGraduate: false,
    isShowPrereq: false,
    isRequired: false,
  }

  componentDidMount() {
    axios
    .get('/department-list.json')
    .then(res => {
      this.setState({departmentList: res.data})
      this.setState({department:res.data[0].code})
    });
  }

  handleDepartment = (event) => {
    this.setState({department: event.target.value || undefined})
  }
  handleCourseID = (event) => {
    this.setState({courseID: event.target.value || undefined})
  }
  handleDescription = (event) => {
    this.setState({description: event.target.value || undefined})
  }
  handleCourseName = (event) => {
    this.setState({courseName: event.target.value || undefined})
  }
  handleNumOfCredits = (event) => {
    this.setState({numOfCredits: event.target.value || undefined})
  }
  handleisGraduate = (event) => {
    if (this.state.isGraduate==true)
      this.setState({isGraduate: false})
    else
      this.setState({isGraduate: true})
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.department==undefined||this.state.courseName==undefined||this.state.courseID==undefined||this.state.description==undefined||this.state.numOfCredits==undefined){
      this.setState({isRequired:false});
    }
    else{
      axios
      .post("/course-list.json",{
        department: this.state.department,
        number: this.state.courseID,
        name: this.state.courseName,
        description: this.state.description,
        numberOfCredits: this.state.numOfCredits,
        isGraduate: this.state.isGraduate
      })
      .then(res => (
        this.setState({course:res.data})
      ))
      this.setState({isShowPrereq:true})
    }
  }
  
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
          {this.state.course==undefined?(
            <div className="col-md-12">
              <CreateCourseForm 
                departmentList={this.state.departmentList} 
                handleDepartment={this.handleDepartment.bind()}
                handleCourseName={this.handleCourseName.bind()}
                handleCourseID={this.handleCourseID.bind()}
                handleDescription={this.handleDescription.bind()}
                handleNumOfCredits={this.handleNumOfCredits.bind()}
                handleSubmit={this.handleSubmit.bind()}
                handleisGraduate={this.handleisGraduate.bind()}
                isGraduate={this.state.isGraduate} />
              {this.state.isRequired?(
                <p>Please fill out all forms</p>
              ) : (
                <p></p>
              )}
            </div>
          ):(
            <div className="col-md-12">
              <h4 className="col-md-12 text-center">Added Successfully into the database</h4>
                <Link to={{
                  pathname: '/admin/view-course-list'
                }} className="col-md-6 btn btn-info">Back to Course List</Link>
                <Link to={{
                  pathname: '/admin/add-prerequisite',
                  state: {courseID: this.state.course.id}
                }} className="col-md-6 btn btn-info">Add Prerequisites</Link>
            </div>
          )}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}


export default CreateCourse;
