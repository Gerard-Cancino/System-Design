import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class CreateCourse extends Component {
  state = {
    department: undefined,
    number: undefined,
    description: undefined,
    name: undefined,
    numOfCredits: undefined,
    isGraduate: false
  }

  componentWillMount() {
    axios
    .get('/course-list.json')
    .then(res => {
      this.setState({
        course: res.data,
      })
    })
  }

  handleDepartment = (event) => {
    this.setState(event.target.value || undefined)
  }
  handleNumber = (event) => {
    this.setState(event.target.value || undefined)
  }
  handleDescription = (event) => {
    this.setState(event.target.value || undefined)
  }
  handleName = (event) => {
    this.setState(event.target.value || undefined)
  }
  handleNumOfCredit = (event) => {
    this.setState(event.target.value || undefined)
  }
  handleisGraduate = (event) => {
    this.setState(event.target.value || undefined)
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="text-center row m-4 p-4 h-100">
            <h2>Create Course</h2>
            <form>
              <label>Department</label>
              <input />
              <label>Number</label>
              <label>Name</label>
              <label>Description</label>
              <label>Number of Credits</label>
              <label>Is Graduate Course</label> 
            </form>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CreateCourse;
