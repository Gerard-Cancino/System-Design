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
    gradeString:undefined,
    cs_ID: undefined,
    id: undefined,
    status: undefined
  }

  componentDidMount(){
    // console.log('loaded');
    // axios
    //   .then(res => {
    //   .get(`/grade-details.json/${this.state.student}/${this.state.cs_ID}`)
    //     this.setState({
    //       gradeString: res.data,
    //     })
    //     console.log(this.state.gradeString)
    //   })
}
  handleStudent = (event) => {
    this.setState({ student: event.target.value || undefined});
    //console.log(this.state.studentUsername);
  }
  handleCourseSection_ID = (event) => {
    this.setState({ cs_ID: event.target.value || undefined});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/grade-details.json/${this.state.student}/${this.state.cs_ID}`)
      .then(res => {
        this.setState({
          gradeString: res.data
        })
      })
      .catch(res => {
        this.setState({
           status: res.response.status
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
          <form className="col-md-12" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="studentCourseSection">Enter course section for the grade you wish to view</label>
              <input type="text" className="form-control" id="studentCourseSection" placeholder="Enter Course Section ID" onChange={this.handleCourseSection_ID}/>
              <br />
              <label htmlFor="studentEmail">Enter Student Email to search by</label>
              <input type="text" className="form-control" id="studentEmail" placeholder="Enter Student email" onChange={this.handleStudent}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
              <br></br>
              {this.state.gradeString==undefined?(
                this.state.status==404 || this.state.status==500?(
                  <h2>Invalid Information inputted.</h2>
                ):(
                  <p></p>
                )

               //if inside of if else outside of that first if
              ):(
                this.state.gradeString.type=='F'?( //then
                  <div>
                  <h4>Student: {this.state.gradeString.student.user.lastName}, {this.state.gradeString.student.user.firstName}</h4>
                  <p>Department Name: {this.state.gradeString.course_section.course.department.name}</p>
                  <p>Class Name: {this.state.gradeString.course_section.course.name}</p>
                  <p>Number of Credits: {this.state.gradeString.course_section.course.numberOfCredits}</p>
                  <p>Final Grade: {this.state.gradeString.letterGrade}</p>
                  </div>
                ):(
                  //{this.state.gradeString.type=='M'?(
                  <div>
                  <h4>Student: {this.state.gradeString.student.user.lastName}, {this.state.gradeString.student.user.firstName}</h4>
                  <p>Department Name: {this.state.gradeString.course_section.course.department.name}</p>
                  <p>Class Name: {this.state.gradeString.course_section.course.name}</p>
                  <p>Number of Credits: {this.state.gradeString.course_section.course.numberOfCredits}</p>
                  <p>Midterm Grade: {this.state.gradeString.letterGrade}</p>
                  </div>
                //):(

                //)}

                )
          )}

          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default ViewStudentGrades;
