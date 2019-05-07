import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewStudentGrades extends Component {
  state = {
    student: undefined,
    coursesect: undefined,
    numbergrade:undefined,
    finalgrade:undefined,
    gradeString:undefined
  }

  componentDidMount(){
    axios
      .get(`/grade-details.json/${this.state.gradeString}`)
      .then(res => {
        this.setState({
          gradeString: res.data,
        })
        console.log(this.state.gradeString)
      })
}
  handleStudent = (event) => {
    this.setState({ student: event.target.value || undefined});
    //console.log(this.state.studentUsername);
  }

  handleGrade = (event) => {
    this.setState({ gradeString: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/student-details.json/${this.state.student}`)
      .then(res => {
        this.setState({
          student: res.data
        })
      })
    this.setState({isLoaded: true})
  }

  handleDelete = (student, numbergrade) => (event) => {
    event.preventDefault();
    console.log(this.state.student)
    axios
      .put(`/student-details.json/${this.state.student}`,
        {finalgrade: this.state.numbergrade}
      )
      .then(res => {
        this.setState({
          student: res.data,
          finalgrade: res.data
        })
      })
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
          <h2 className="col-md-12 text-center">Student Grade</h2>
          <form className="col-md-12" onSubmit={this.handleStudent}>
            <div className="form-group">
              <label htmlFor="studentUsername"></label>
              <input type="text" className="form-control" id="studentUsername" placeholder="Enter Student's Username" onChange={this.handleChange}/>
              <br />
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default ViewStudentGrades;
