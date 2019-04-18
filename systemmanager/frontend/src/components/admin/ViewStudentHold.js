import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewStudentHold extends Component {
  state = {
    studentUsername: '',
    studentHold: [],
    placeholder: '',
    isLoaded: false,
    isSuccessful: false,
    isBeingRemoved: false,
  }

  handleChange = event => {
    this.setState({ studentUsername: event.target.value });
    //console.log(this.state.studentUsername);
  }

  handleDelete = item => {
    axios
    .delete(`/admin/remove-student-hold/${this.state.studentHold.studentUser.id}/${item}.delete`)
    .then(res => {
      this.setState({
        isSuccessful: res.data.isSuccessful,
        isBeingRemoved: true
      })
    });
    axios
    .get(`/admin/view-student-hold/${this.state.studentUsername}.json`)
    .then(res => {
      this.setState({
        isLoaded: true,
        studentHold: res.data
      })
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .get(`/admin/view-student-hold/${this.state.studentUsername}.json`)
      .then(res => {
        this.setState({
          isLoaded: true,
          studentHold: res.data
        })
      })

  }

  render(){
    const Info = () =>
      !this.state.isLoaded? (
        <p></p>
      ) : (
        this.state.studentHold.studentUser == ''?(
          <p>The user you searched for does not exist</p>
        ) : (
          this.state.studentHold.studentUser.type != 'S'?(
            <p>The user you searched is not a student.</p>
          ) : (
            this.state.studentHold.studentHold.length == 0?(
              <div>
                <p>{this.state.studentHold.studentUser.firstName} {this.state.studentHold.studentUser.lastName}</p>
                <p>No Holds</p>
              </div>
            ) : (
              <div>
                {this.state.isBeingRemoved?(
                  this.state.isSuccessful?(
                    <p>Hold was successfully removed</p>
                    ) : (
                      <p>Hold removal failed</p>
                    )
                ) : (
                  <p></p>
                )}
                <h2>{this.state.studentHold.studentUser.firstName} {this.state.studentHold.studentUser.lastName}</h2>
                {this.state.studentHold.studentHold.map(studentHold => (
                  <div key={studentHold.id}>
                    <h4><strong>Hold</strong></h4>
                    <p>Hold Code: {studentHold.hold.name}</p>
                    <p>Hold Type: {studentHold.hold.type}</p>
                    <p>Hold De: {studentHold.hold.description}</p>
                    <button onClick={() => this.handleDelete(studentHold.id)} type="submit" className="btn btn-danger">Remove</button>
                  </div>
                ))}
              </div>
            )
          )
        )
      );
    console.log("reloading page");
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">View Student Hold</h2>
            <form className="col-md-12" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentUsername"></label>
                <input type="text" className="form-control" id="studentUsername" placeholder="Enter Student's Username" onChange={this.handleChange}/>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button> 
              </div>
            </form>
            <Info data={this.state}/>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}


export default ViewStudentHold;
