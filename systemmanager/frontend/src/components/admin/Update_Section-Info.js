import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchFacultyList from '../general/inputs/Faculty_List_Search.js';
import SearchRoomList from '../general/inputs/Room_List_Search.js';
import SearchBuildingList from '../general/inputs/Building_List_Search.js';
import InputNumSeats from '../general/inputs/Number_Seats_Input.js'


// View Course Catalog -> Add (Button) -> Fill out Required 
// -> (optional inputs) -> submit -> return json of for course id to master
class UpdateSectionMaster extends Component {
  state = {
    id: undefined,
    section: undefined,
    faculty: undefined,
    facultyList: undefined,
    numOfSeats: undefined,
    result: undefined
  }
  componentDidMount(){
    this.setState({'id': this.props.data.state.id})
    axios
    .get(`/course-section-details.json/${this.props.data.state.id}`)
    .then(res => {
      this.setState({section: res.data.data})
      this.setState({numOfSeats: res.data.data.numOfSeats})
      axios
      .get('/faculty-list.json', {
        params: {
          'department': res.data.data.course.department.code
        }
      })
      .then( res => {
        this.setState({
          facultyList: res.data.data,
          faculty: res.data.data[0].user.id
        })
      })
    })
    axios
    .get('/building-list.json')
    .then(res => {
      this.setState({'buildingList': res.data.data})
      let roomList=[]
      axios
      .get('/room-list.json',{
        params:{
          'building': res.data.data[0].code,
          'type': 'C'
        }
      })
      .then(room => {
        for (let el of room.data.data){
          console.log(el)
          roomList.push(el)
        }
        axios
        .get('/room-list.json',{
          params:{
            'building': res.data.data[0].code,
            'type':'L'
          }
        })
        .then(room=>{
          for (let el of room.data.data){
            roomList.push(el)
          }
          this.setState({roomList:roomList})

          this.setState({'room': roomList[0].id})
        })
      })
    })
    
  }
  handleBuilding = event => {   
    this.setState({ building: event.target.value });
    let building = event.target.value;
    let roomList = [];
    axios
    .get('/room-list.json',{
      params:{
        'building': building,
        'type': 'C'
      }
    })
    .then(room => {
      for (let el of room.data.data){
        console.log(el)
        roomList.push(el)
      }
      axios
      .get('/room-list.json',{
        params:{
          'building': building,
          'type':'L'
        }
      })
      .then(room=>{
        for (let el of room.data.data){
          roomList.push(el)
        }
        this.setState({roomList:roomList})

        this.setState({'room': roomList[0].id})
      })
    })
  }
  handleRoom = event => {   
    this.setState({ room: event.target.value || undefined});
  }
  handleFaculty = event => {   
    this.setState({ faculty: event.target.value || undefined});
  }
  handleNumOfSeats =event => {
    this.setState({numOfSeats: event.target.value || undefined})
  }

  handleSubmit = event => {
    event.preventDefault()
    axios
    .put(`/course-section-details.json/${this.state.id}`,{
      faculty: this.state.faculty,
      numOfSeats: this.state.numOfSeats,
      room: this.state.room
    })
    .then(res=> {
      this.setState({
        result: res,
        section: res.data.data,
        numOfSeats: res.data.data.numOfSeats
      })
    })
    .catch(err=>{
      this.setState({result:err})
    })
    
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
            {this.state.section==undefined?(
              <p></p>
            ) : (
              <div className="row border rounded m-4 p-4">
                <div className="col-md-12">
                  <Link to={{
                    pathname: '/admin/update-section-slot',
                    state: {
                      id: this.state.id
                    }
                  }} className="col-md-2 btn btn-success float-right">Next</Link>
                </div>
                <h2 className="col-md-12 text-center">Update Section to Master</h2>
                <form className="col-md-12" onSubmit={this.handleSubmit}>
                  {this.state.section.course == null?(
                    <p></p>
                  ) : (
                    <h4>{this.state.section.course.name} - Section: {this.state.section.number}</h4>
                  )}
                  <br />
                  <p className="col-md-12 text-secondary"><strong>Number of Seats in Total: </strong>{this.state.section.numOfSeats}</p>
                  <p className="col-md-12 text-secondary"><strong>Number of Seats Currently Taken: </strong>{this.state.section.numOfTaken}</p>
                  <InputNumSeats onChange={this.handleNumOfSeats} />
                  <p className="col-md-12 text-secondary"><strong>Current Professor: </strong>{this.state.section.faculty.user.firstName} {this.state.section.faculty.user.lastName}</p>
                  <SearchFacultyList onChange={this.handleFaculty.bind()} facultyList={this.state.facultyList} isRequired={true}/>
                  <p className="col-md-12 text-secondary"><strong>Building and Room: </strong>{this.state.section.room.building.name} {this.state.section.room.number}</p>
                  <div className="col-md-12 form-group">
                    <label>Building and Room: </label>
                    <SearchBuildingList onChange={this.handleBuilding.bind()} buildingList={this.state.buildingList} isRequired={true}/>
                    <SearchRoomList onChange={this.handleRoom.bind()} roomList={this.state.roomList} isRequired={true}/>
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
