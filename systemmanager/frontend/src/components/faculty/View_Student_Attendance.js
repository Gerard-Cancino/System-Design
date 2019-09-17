import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewAttendanceList extends Component {
  state = {
    attendanceString: undefined,
    CourseSectionID: undefined
  }

  handleCourseSectionID = (event) => {
    this.setState({ CourseSectionID: event.target.value || undefined});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/attendance-list.json/${this.state.CourseSectionID}`)
      .then(res => {
        this.setState({
          attendanceString: res.data
        })
      })
    this.setState({isLoaded: true})
  }

  render(){
    const Tables = () => (
      this.state.attendanceString == undefined?(
        <p></p>
      ):(
        this.state.attendanceString.length == 0? (
          <p><br></br>Invalid Information entered</p>
        ):(
          <div className="col-md-12">
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className='col-md-3'>Student Name</td>
                  <td className='col-md-3'>Course</td>
                  <td className='col-md-3'>Date Attended</td>
                  <td className='col-md-3'>Present</td>
                </tr>
              </thead>
              <tbody>
                {this.state.attendanceString.map(el => (
                  <tr key={el.id}>
                    <td className='col-md-3'>{el.enrollment.student.user.firstName} {el.enrollment.student.user.lastName}</td>
                    <td className='col-md-3'>{el.enrollment.course_section.course.id}</td>
                    <td className='col-md-3'>{el.dayAttended}</td>
                    <td className='col-md-3'>{el.isPresent}</td>
                    {//check box for is present?
                  }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )
    )
    console.log("reloading page");
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded p-4 m-4">
            <h2 className="col-md-12 text-center">View Attendance List</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="CourseSection">Enter Course Section ID</label>
                  <input type="text" className="form-control" id="CourseSection" placeholder="Enter Course Section ID" onChange={this.handleCourseSectionID}/>
                  <br />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              <Tables />
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewAttendanceList;
