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
    isInCatalog: false,
    result: undefined
  }

  componentDidMount() {
    axios
    .get('/department-list.json')
    .then(res => {
      this.setState({departmentList: res.data.data})
      this.setState({department:res.data.data[0].code})
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
  handleIsInCatalog=(e)=>{
    if (e.target.value=="true")
      this.setState({isInCatalog:true})
    else
      this.setState({isInCatalog:false})
  }
  handleSubmit = (event) => {
    event.preventDefault();
    axios
    .post("/course-list.json",{
      department: this.state.department,
      number: this.state.courseID,
      name: this.state.courseName,
      description: this.state.description,
      numberOfCredits: this.state.numOfCredits,
      isGraduate: this.state.isGraduate,
      isInCatalog: this.state.isInCatalog
    })
    .then(res => (
      this.setState({result: res,course:res.data.data})
    ))
    .catch(err =>{
      this.setState({result: err})
    })
    this.setState({isShowPrereq:true})
  }
  
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4">
          {this.state.course==undefined?(
            <div className="col-md-12">
              <CreateCourseForm 
                departmentList={this.state.departmentList} 
                handleDepartment={this.handleDepartment.bind(this)}
                handleCourseName={this.handleCourseName.bind(this)}
                handleCourseID={this.handleCourseID.bind(this)}
                handleDescription={this.handleDescription.bind(this)}
                handleNumOfCredits={this.handleNumOfCredits.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleisGraduate={this.handleisGraduate.bind(this)}
                isGraduate={this.state.isGraduate}
                handleIsInCatalog={this.handleIsInCatalog.bind(this)} 
                isInCatalog={this.state.isInCatalog}/>
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
