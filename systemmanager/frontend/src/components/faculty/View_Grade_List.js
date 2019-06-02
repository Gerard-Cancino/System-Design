import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class View_Grade_List extends Component {
  state = {
    student:undefined,
    gradeString: undefined,
    advisor: undefined
  }

  getGradeList(){
    axios
    .get('/grade-list.json')
    .then(res => {
      this.setState({
        gradeString: res.data
      })
    })
  }

  componentDidMount(){

  }


  handleStudent = (event) => {
    this.setState({ student: event.target.value || undefined});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/grade-list.json/${this.state.student}`)
      .then(res => {
        this.setState({
          gradeString: res.data
        })
      })
    this.setState({isLoaded: true})
  }

  render(){
    const Tables = () => (
      this.state.gradeString == undefined?(
        <p></p>
      ):(
        this.state.gradeString.length == 0? (
          <p><br></br> No Grades available in the system.</p>
        ):(
          <div className="col-md-12">
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className='col-md-3'>Course</td>
                  <td className='col-md-2'>Section</td>
                  <td className='col-md-2'>Grade Type</td>
                  <td className='col-md-3'>Grade Recieved</td>
                  <td className='col-md-2'># Of Credits</td>
                </tr>
              </thead>
              <tbody>
                {this.state.gradeString.map(el => (
                  <tr key={el.id}>
                    <td className='col-md-3'>{el.course_section.course.name}</td>
                    <td className='col-md-2'>{el.course_section.course.id}</td>
                    <td className='col-md-2'>{el.type}</td>
                    <td className='col-md-2'>{el.letterGrade}</td>
                    <td className='col-md-2'>{el.course_section.course.numberOfCredits}</td>
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
              <h2 className="col-md-12 text-center">View Grade List</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="studentid">Enter Student ID</label>
                  <input type="text" className="form-control" id="studentid" placeholder="Enter Student ID" onChange={this.handleStudent}/>
                  <br />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>

              {this.state.gradeString == undefined?(
                <p></p>
              ):(
                this.state.gradeString.length == 0? (
                  <p><br></br> No Grades available in the system.</p>
                ):(
                  <h3>Student Name: {this.state.gradeString[0].student.user.firstName}, {this.state.gradeString[0].student.user.lastName} </h3>
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
export default View_Grade_List;
