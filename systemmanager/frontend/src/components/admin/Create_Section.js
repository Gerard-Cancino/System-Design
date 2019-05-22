import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchFacultyList from '../general/inputs/Faculty_List_Search.js';
import SearchRoomList from '../general/inputs/Room_List_Search.js';
import SearchBuildingList from '../general/inputs/Building_List_Search.js';
import SearchTermList from '../general/inputs/Term_List_Search.js';
import { resetWarningCache } from 'prop-types';

// need to add prereq
class CreateSection extends Component {
  state = {
    id: undefined,
    section: undefined,
    faculty: undefined,
    facultyList: undefined,
    numOfSeats: undefined,
    course: undefined,
    term: undefined
  }
  componentDidMount(){
    this.setState({'id': this.props.data.state.courseID})
    axios
    .get(`/course-details.json/${this.props.data.state.courseID}`)
    .then(res => {
      this.setState({course: res.data})
      axios
      .get('/faculty-list.json', {
        params: {
          'department': res.data.department.code
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
    axios
    .get('/building-list.json')
    .then(res => {
      this.setState({'buildingList': res.data})
      axios
      .get('/room-list.json',{
        params:{
          'building': res.data[0].code
        }
      })
      .then(res => {
        this.setState({'roomList': res.data})
        this.setState({'room': res.data[0].id})
      })
    })
    axios
    .get('/term-list.json')
    .then(res => {
      this.setState({termList:res.data})
      this.setState({term:res.data[0].id})
    })
    
  }
  handleBuilding = event => {   
    this.setState({ building: event.target.value });
    axios
    .get('/room-list.json', {
      params: {
        'building': event.target.value
      }
    })
    .then( res => {
      this.setState({'roomList': res.data})
      this.setState({'room': res.data[0].id})
    });
  }
  handleRoom = event => {   
    this.setState({ room: event.target.value || undefined});
  }
  handleFaculty = event => {   
    this.setState({ faculty: event.target.value || undefined});
  }
  handleNumOfSeats =event => {
    this.setState({numOfSeats: event.target.value})
  }
  handleTerm = event => {
    this.setState({term:event.target.value||undefined})
  }
  handleSubmit = event => {
    event.preventDefault()
    axios
    .post(`/course-section-list.json`,{
      course: this.state.course.id,
      faculty: this.state.faculty,
      numOfSeats: this.state.numOfSeats,
      room: this.state.room,
      term: this.state.term
    })
    .then(res=> {
      this.setState({section: res.data})
    })
    
  }
  
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          {this.state.course==undefined?(
            <p>Loading or Error</p>
          ):(
            <div className="row border rounded m-4 p-4 h-100"> 
              {this.state.section==undefined?(
                <p></p>
              ):(
                <div className="col-md-12">
                  <h3 className="col-md-4 float-left">Successful!</h3>
                  <Link to={{
                    pathname: '/admin/update-section-slot',
                    state: {
                      id: this.state.section.id
                    }
                  }} className="col-md-2 btn btn-success float-right">Next</Link>
                </div>
              )}
              <h2 className="col-md-12 text-center">Create Section for {this.state.course.id}</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit}>
                <div className="form-group col-md-12">
                  <label>Number of Seats:</label>
                  <input className="form-control" onChange={this.handleNumOfSeats} placeholder={0} />
                </div>
                <SearchFacultyList onChange={this.handleFaculty.bind()} facultyList={this.state.facultyList} />
                <SearchBuildingList onChange={this.handleBuilding.bind()} buildingList={this.state.buildingList} />
                <SearchRoomList onChange={this.handleRoom.bind()} roomList={this.state.roomList} />
                {this.state.termList==undefined?(
                  <p></p>
                ) : (
                  this.state.termList.length==0? (
                    <p>No Terms Found</p> 
                  ) : (
                    <div className="form-group col-md-12">
                      <label htmlFor="term">Term:</label>
                      <select id="term" className="form-control" onChange={this.handleTerm}>
                        {this.state.termList.map(single => (
                          <option key={single.id} value={single.id}>{single.season}: {single.year}</option>
                        ))}
                      </select>
                    </div>

                  )
                )}
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


export default CreateSection;
