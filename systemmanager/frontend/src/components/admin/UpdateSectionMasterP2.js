import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchFacultyList from '../general/Faculty_List_Search.js'


// View Course Catalog -> Add (Button) -> Fill out Required 
// -> (optional inputs) -> submit -> return json of for course id to master
class UpdateSectionMaster extends Component {
  state = {
    id: undefined,
    section: undefined,
    faculty: undefined,
    facultyList: undefined,
    numOfSeats: undefined,
  }
  componentDidMount(){
    this.setState({'id': this.props.data.state.id})
    axios
    .get(`/course-section-details.json/${this.props.data.state.id}`)
    .then(res => {
      this.setState({section: res.data})
      this.setState({numOfSeats: res.data.numOfSeats})
      axios
      .get('/faculty-list.json', {
        params: {
          'department': res.data.course.department.code
        }
      })
      .then( res => {
        this.setState({
          facultyList: res.data,
          faculty: res.data[0].user.id
        })
      })
      if(res.data.faculty!=undefined)
        this.setState({'faculty': res.data.faculty.user.id})
    })
  }
  handleFaculty = event => {   
    this.setState({ faculty: event.target.value });
  }
  handleNumOfSeats =event => {
    this.setState({numOfSeats: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    axios
    .put(`/course-section-details.json/${this.state.id}`,{
      faculty: this.state.faculty,
      numOfSeats: this.state.numOfSeats
    })
    .then(res=> {
      this.setState({section: res.data})
      this.setState({numOfSeats: res.data.numOfSeats})
      if(res.data.faculty!=undefined)
        this.setState({'faculty': res.data.faculty.user.id})
    })
    
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
            {this.state.section==undefined?(
              <p></p>
            ) : (
              <div className="row border rounded m-4 p-4 h-100">
                <div className="col-md-12">
                  <Link to={{
                    pathname: '/admin/view-master-schedule'
                  }} className="col-md-2 btn btn-success float-right">Back to Master Schedule</Link>
                </div>
                <h2 className="col-md-12 text-center">Update Section to Master</h2>
                <form className="col-md-12" onSubmit={this.handleSubmit}>
                  {this.state.section.course == null?(
                    <p></p>
                  ) : (
                    <h4>{this.state.section.course.name} - Section: {this.state.section.number}</h4>
                  )}
                  <label>Number of Seats:</label>
                  <input onChange={this.handleNumOfSeats} placeholder={this.state.section.numOfSeats}></input>
                  <p className="text-secondary">Number of Seats Currently Taken: {this.state.section.numOfTaken}</p>
                  <label>Faculty's Name:</label>
                  {this.state.section.faculty==undefined?(
                    <p>No Faculty submitted</p>
                  ) : (
                    <p>Current Professor: {this.state.section.faculty.user.firstName} {this.state.section.faculty.user.lastName}</p>
                  )}
                  <SearchFacultyList onChange={this.handleFaculty} facultyList={this.state.facultyList} />
                  
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            )}
        </section>
        <Footer />
      </React.Fragment>
      
    );
  }
}



export default UpdateSectionMaster;
