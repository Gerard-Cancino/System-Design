import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewAdviseeList extends Component {
  state = {
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
  }


  handleFaculty = (event) => {
    this.setState({ faculty: event.target.value || undefined});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/advisor-list.json/${this.state.faculty}`)
      .then(res => {
        this.setState({
          adviseeString: res.data
        })
      })
    this.setState({isLoaded: true})
  }

  render(){
    const Tables = () => (
      this.state.adviseeString == undefined?(
        <p></p>
      ):(
        this.state.adviseeString.length == 0? (
          <p><br></br>Advisees: None</p>
        ):(
          <div className="col-md-12">
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className='col-md-3'>Advisee's Name</td>
                  <td className='col-md-3'>Advisee's Email</td>
                  <td className='col-md-3'>Date Assigned</td>
                  <td className='col-md-3'>Student ID</td>
                </tr>
              </thead>
              <tbody>
                {this.state.adviseeString.map(el => (
                  <tr key={el.id}>
                    <td className='col-md-1'>{el.student.user.firstName} {el.student.user.lastName}</td>
                    <td className='col-md-3'>{el.student.user.email}</td>
                    <td className='col-md-4'>{el.dateAssigned}</td>
                    <td className='col-md-1'>{el.student.user.id}</td>
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
        <Header  username={this.props.user}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded p-4 m-4">
              <h2 className="col-md-12 text-center">View Advisee List</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="studentCourseSection">Enter Faculty ID</label>
                  <input type="text" className="form-control" id="studentCourseSection" placeholder="Enter Faculty ID" onChange={this.handleFaculty}/>
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
