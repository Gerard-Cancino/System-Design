import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class StudentHold extends Component {
  state = {
    studentUsername: '',
    holdSelected: '',
    student: '',
    hold: [],
    isSuccessful: false,
    isLoaded: false
  }
  componentWillMount(){
    axios
      .get('/hold-list.json')
      .then(res => {
        this.setState({
          hold: res.data,
          holdSelected: res.data[0].name
        })
      })
  }
  handleChange = event => {   
    this.setState({ studentUsername: event.target.value });
  }
  handleChange1 = event => {    
    this.setState({ holdSelected: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .get(`/student-details.json/${this.state.studentUsername}`)
      .then(res => {
        this.setState({
          student: res.data
        })
      })
    this.setState({isLoaded: true})
  }

  render(){
    const FindStudent = () => 
      this.state.student != ''?(
        <div>
          <p>{this.state.student.user.firstName} {this.state.student.user.lastName}</p>
          {this.state.student.hold.length != 0?(
            this.state.student.hold.map(el => {
              <p>{el.type}</p>
            })
          ):(
            <p>Student has no holds</p>
          )}
        </div>
      ):(
        <p></p>
      )
    

    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">Student Hold</h2>
            <form className="col-md-12" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentUsername"></label>
                <input type="text" className="form-control" id="studentUsername" placeholder="Enter Student's Username" onChange={this.handleChange}/>
                <br />
                <br />
                <button type="submit" className="btn btn-primary">Submit</button> 
              </div>
            </form>
            <FindStudent />
          </div>
        </section>
      </React.Fragment>
    );
  }
}



export default StudentHold;
