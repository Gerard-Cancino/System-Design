import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewAdviseeList extends Component {
  state = {
    student: undefined,
    faculty: undefined,
    adviseeString: undefined,
    advisor: undefined
  }

  getAdviseeList(){
    axios
    .get('/advisor-list.json')
    .then(res => {
      this.setState({
        adviseeString: res.data
      })
    })
  }

  componentDidMount(){
    this.getAdviseeList()
  }

  handleStudent = (event) => {
    this.setState({ student: event.target.value || undefined});
    //console.log(this.state.studentUsername);
  }

  handleFaculty = (event) => {
    this.setState({ faculty: event.target.value || undefined});
  }
/*
  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/advisee-details.json/${this.state.faculty}`)
      .then(res => {
        this.setState({
          adviseeString: res.data
        })
      })
    this.setState({isLoaded: true})
  }
*/
  render(){
    const Tables = () => (
      this.state.adviseeString != undefined && this.state.adviseeString.length != 0? (
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">View Advisee List</h2>
              <table>
                <thead>
                  <tr>
                    <td className='col-md-1'>Advisee's Name</td>
                    <td className='col-md-3'>Advisee's Email</td>
                    <td className='col-md-1'>Date Assigned</td>
                    <td className='col-md-1'></td>
                    <td className='col-md-1'></td>
                    <td className='col-md-1'></td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.course.map(el => (
                    <tr key={el.id}>
                      <td className='col-md-1'>{el.id}</td>
                      <td className='col-md-3'>{el.name}</td>
                      <td className='col-md-4'>{el.description}</td>
                      <td className='col-md-1'>{el.numberOfCredits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
      ) : (
        this.state.isLoaded?(
          <p>Cannot find any courses. This is an error. Please let admin know.</p>
        ) : (
          <p></p>
        )
      )
    )
    console.log("reloading page");
    return(
      <React.Fragment>
        <Header />
        <Tables />
        <Footer />
      </React.Fragment>
    );
  }
}
/*
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
          <h2 className="col-md-12 text-center">Search Advisors</h2>
          <form className="col-md-12" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="facultyName">Enter Faculty email</label>
              <input type="text" className="form-control" id="facultyid" placeholder="Enter Faculty ID" onChange={this.handleFaculty}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          {this.state.adviseeString==undefined?(
            <p></p>
          ):(
            <div>
              <br></br>
              <h4>Advisor: {this.state.adviseeString.faculty.user.id}, {this.state.adviseeString.faculty.user.lastName}, {this.state.adviseeString.faculty.user.firstName}</h4>
              <p>Advisee: {this.state.adviseeString.student.user.firstName}, {this.state.adviseeString.student.user.lastName}</p>
            </div>

          )}

          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
*/
export default ViewAdviseeList;
