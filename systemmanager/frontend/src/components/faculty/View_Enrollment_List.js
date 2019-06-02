import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewClassRoster extends Component {
  state = {
    classRosterString: undefined,
    CourseSectionID: undefined,
    facultyID:undefined
  }


  componentDidMount(){

  }

  handleFaculty = (event) => {
    this.setState({ facultyID: event.target.value || undefined});
  }
  handleCourseSectionID = (event) => {
    this.setState({ CourseSectionID: event.target.value || undefined});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/class-roster-list.json/${this.state.CourseSectionID}/${this.state.facultyID}`)
      .then(res => {
        this.setState({
          classRosterString: res.data
        })
      })
    this.setState({isLoaded: true})
  }

  render(){
    const Tables = () => (
      this.state.classRosterString == undefined?(
        <p></p>
      ):(
        this.state.classRosterString.length == 0? (
          <p><br></br>Roster: None, check with an admin if this is incorrect</p>
        ):(
          <div className="col-md-12">
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className='col-md-2'>Student Name</td>
                  <td className='col-md-8'>Student ID</td>
                  <td className='col-md-1'>Course</td>
                  <td className='col-md-1'>Term</td>
                </tr>
              </thead>
              <tbody>
                {this.state.classRosterString.map(el => (
                  <tr key={el.id}>
                  <td className='col-md-3'>{el.student.user.firstName} {el.student.user.lastName}</td>
                  <td align="middle">{el.student.user.id}</td>
                  <td align="middle">{el.course_section.course.id}</td>
                  <td align="right">{el.course_section.term.season} {el.course_section.term.year}</td>
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
            <h2 className="col-md-12 text-center">View Class Roster</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="CourseSection">Enter Course Section ID</label>
                  <input type="text" className="form-control" id="CourseSection" placeholder="Enter Course Section ID" onChange={this.handleCourseSectionID}/>
                  <br />
                  <label htmlFor="facultyid">Enter Student Email to search by</label>
                  <input type="text" className="form-control" id="facultyid" placeholder="Enter Faculty ID" onChange={this.handleFaculty}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              <br></br>
              {this.state.classRosterString == undefined?(
                <p></p>
              ):(
                this.state.classRosterString.length == 0? (
                  <p> Nothing found in DB</p>
                ):(

                  <h3>Professor Name: {this.state.classRosterString[0].course_section.faculty.user.firstName}, {this.state.classRosterString[0].course_section.faculty.user.lastName} </h3>
                )
              )}
              <Tables />
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewClassRoster;
