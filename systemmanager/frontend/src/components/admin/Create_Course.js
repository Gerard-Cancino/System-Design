import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import CreateCourseForm from '../general/forms/Create_Course_Form.js';
import SearchCourseList from '../general/forms/Search_Course-List.js';
// need to add prereq
class CreateCourse extends Component {
  state = {
    department: undefined,
    departmentList: undefined,
    number: undefined,
    description: undefined,
    courseName: undefined,
    numOfCredits: undefined,
    isGraduate: false,
    isShowPrereq: false,
  }

  componentDidMount() {
    axios
    .get('/department-list.json')
    .then(res => (
      this.setState({departmentList: res.data})
    ));
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
  handleCreateCourse = (event) => {
    event.preventDefault();
    this.setState({isShowPrereq: true})
  }
  handleSubmit = (event) => {
    event.preventDefault();
    axios
    .put("/course-list.json",{
      department: this.state.department
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row m-4 p-4 h-100">
            {!this.state.isShowPrereq?(
              <CreateCourseForm 
                departmentList={this.state.departmentList} 
                handleDepartment={this.handleDepartment.bind()}
                handleCourseName={this.handleCourseName.bind()}
                handleCourseID={this.handleCourseID.bind()}
                handleDescription={this.handleDescription.bind()}
                handleNumOfCredits={this.handleNumOfCredits.bind()}
                handleSubmit={this.handleCreateCourse.bind()}
                handleisGraduate={this.handleisGraduate.bind()}
                isGraduate={this.state.isGraduate}/>
            ):(
              <SearchCourseList />
            )}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CreateCourse;
