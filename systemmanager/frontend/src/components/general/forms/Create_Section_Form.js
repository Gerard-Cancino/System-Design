import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchFacultyList from '../general/inputs/Faculty_List_Search.js';
import SearchRoomList from '../general/inputs/Room_List_Search.js';
import SearchBuildingList from '../general/inputs/Building_List_Search.js';


// View Course Catalog -> Add (Button) -> Fill out Required 
// -> (optional inputs) -> submit -> return json of for course id to master
class CreateSectionForm extends Component {
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
    .get(`/course-details.json/${this.props.data.state.id}`)
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

  handleSubmit = event => {
    event.preventDefault()
    axios
    .post(`/course-section-list.json`,{
      faculty: this.state.faculty,
      numOfSeats: this.state.numOfSeats,
      room: this.state.room
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
            {this.state.section==undefined?(
              <p></p>
            ) : (
              <div className="row border rounded m-4 p-4 h-100">
                <div className="col-md-12">
                {this.state.section==undefined?(
                  <p></p>
                ):(
                  <div className="col-md-12">
                    <h3 className="col-md-4 float-left">Successful!</h3>
                    <Link to={{
                      pathname: '/admin/update-section-slot',
                      state: {
                        id: this.state.id
                      }
                    }} className="col-md-2 btn btn-success float-right">Next</Link>
                  </div>
                )}
                </div>
                <h2 className="col-md-12 text-center">Update Section to Master</h2>
                <form className="col-md-12" onSubmit={this.handleSubmit}>
                  {this.state.section.course == null?(
                    <p></p>
                  ) : (
                    <h4>{this.state.section.course.name} - Section: {this.state.section.number}</h4>
                  )}
                  <div className="form-group">
                    <label>Number of Seats:</label>
                    <input className="form-control" onChange={this.handleNumOfSeats} placeholder={this.state.section.numOfSeats}></input>
                    <p className="text-secondary">Number of Seats Currently Taken: {this.state.section.numOfTaken}</p>
                  </div>
                  <div className="form-group">
                    <label>Faculty's Name:</label>
                    {this.state.section.faculty==undefined?(
                      <p>No Faculty Assigned</p>
                    ) : (
                      <p>Current Professor: {this.state.section.faculty.user.firstName} {this.state.section.faculty.user.lastName}</p>
                    )}
                    <SearchFacultyList onChange={this.handleFaculty.bind()} facultyList={this.state.facultyList} />
                  </div>
                  <div className="form-group">
                    <label>Room</label>
                    {this.state.section.room==undefined?(
                      <p>No Room Assigned</p>
                    ) : (
                      <p>{this.state.section.room.building.name} {this.state.section.room.number}</p>
                    )}
                    <SearchBuildingList onChange={this.handleBuilding.bind()} buildingList={this.state.buildingList} />
                    <SearchRoomList onChange={this.handleRoom.bind()} roomList={this.state.roomList} />
                  </div>
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
