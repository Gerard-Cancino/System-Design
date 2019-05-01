import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import BuildingSearch from '../general/inputs/Building_List_Search.js';
import RoomSearch from '../general/inputs/Room_List_Search.js'
import TermSearch from '../general/inputs/Term_List_Search.js';
import TimeSearch from '../general/inputs/Time_List_Search.js';
import DaySearch from '../general/inputs/Day_Search.js';


// View Course Catalog -> Add (Button) -> Fill out Required 
// -> (optional inputs) -> submit -> return json of for course id to master
class UpdateSectionMaster extends Component {
  state = {
    id: undefined,
    section: [],
    building: undefined,
    buildingList: undefined,
    room: undefined,
    roomList: undefined,
    slot: undefined,
    slotList: undefined,
    term: undefined,
    termList: undefined,
    time: undefined,
    timeList: undefined,
    days: {
      MO: true,
      TU: true,
      WE: true,
      TH: true,
    }
  }
  componentDidMount(){
    this.setState({'id': this.props.data.state.id})
    axios
    .get(`/course-section-details.json/${this.props.data.state.id}`)
    .then(res => {
      this.setState({'section': res.data})
      if(res.data.slot[0] == undefined)
        axios
        .get('/term-list.json')
        .then(res => {
          this.setState({'termList': res.data})
          this.setState({'term':undefined})
        })
      else
        this.setState({
          term: res.data.slot[0].term.id,
          termList: undefined
        })
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
    .get('/time-list.json')
    .then(res => {
      this.setState({'timeList': res.data})
      this.setState({'time':res.data[0].id})
    })
  }
  handleFind = event => {
    event.preventDefault();
    axios
      .get('/slot-list.json',{
        params: {
          'room': this.state.room,
          'building': this.state.building,
          'term': this.state.term,
          'time': this.state.time,
          'monday': this.state.days.MO,
          'tuesday': this.state.days.TU,
          'wednesday': this.state.days.WE,
          'thursday': this.state.days.TH,
        }
      })
      .then(res => {
        this.setState({'slotList': res.data})
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
  handleTerm = event => {   
    this.setState({ term: event.target.value || undefined});
  }
  handleTime = event => {   
    this.setState({ time: event.target.value || undefined});
  }
  handleDays = event => {
    let selectedDay = this.state.days;
    if (event.target.value=='MO')
      if(selectedDay.MO == false)
        selectedDay.MO = true;
      else
        selectedDay.MO = false;
    else if (event.target.value=='TU')
      if(selectedDay.TU == false)
        selectedDay.TU = true;
      else
        selectedDay.TU = false;
    else if (event.target.value=='WE')
      if(selectedDay.WE == false)
        selectedDay.WE = true;
      else
        selectedDay.WE = false;
    else if (event.target.value=='TH')
      if(selectedDay.TH == false)
        selectedDay.TH = true;
      else
        selectedDay.TH = false;
    this.setState(selectedDay)
  }
  handleAdd = (slot) => (event) => {
    event.preventDefault()
    axios
    .put(`/course-section-details.json/${this.state.id}`, {
      'slot': slot
    })
    .then(res => {
      this.setState({section:res.data,})
        this.setState({
          term: res.data.slot[0].term.id,
          termList: undefined
        })
      axios
      .get('/slot-list.json',{
        params: {
          'room': this.state.room,
          'building': this.state.building,
          'term': this.state.term,
          'time': this.state.time,
          'monday': this.state.days.MO,
          'tuesday': this.state.days.TU,
          'wednesday': this.state.days.WE,
          'thursday': this.state.days.TH,
        }
      })
      .then(res => {
        this.setState({'slotList': res.data})
      })
    })
  }
  handleRemove = (slot) => (event) => {
    event.preventDefault()
    axios
    .put(`/course-section-details.json/${this.state.id}`, {
      'slot': slot
    })
    .then(res => {
      this.setState({section:res.data})
      if (res.data.slot.length==0){
        axios
        .get('/term-list.json')
        .then(res => {
          this.setState({'termList': res.data})
          this.setState({'term':undefined})
          axios
          .get('/slot-list.json',{
            
            params: {
              'room': this.state.room,
              'building': this.state.building,
              'term': this.state.term,
              'time': this.state.time,
              'monday': this.state.days.MO,
              'tuesday': this.state.days.TU,
              'wednesday': this.state.days.WE,
              'thursday': this.state.days.TH,
            }
          })
          .then(res => {
            this.setState({'slotList': res.data})
          })
        })
      }
      else{
        this.setState({'term':res.data.slot[0].term.id})
      }

    })
  }

  render(){
    
    const Slot = () => {
      return(
        this.state.slotList==undefined?(
          <p></p>
        ) : (
          <form className="col-md-12">
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className="col-md-2">Day</td>
                  <td className="col-md-3">Building - Room</td>
                  <td className="col-md-1">Capacity</td>
                  <td className="col-md-1">Term</td>
                  <td className="col-md-4">Time</td>
                  <td className="col-md-1"></td>
                </tr>
              </thead>
              <tbody className="col-md-12">
                {this.state.slotList.map(el=> (
                  <tr className="col-md-12" key={el.id}>
                    <td className="col-md-2">{el.day.name}</td>
                    <td className="col-md-3">{el.room.building.code} - {el.room.number}</td>
                    <td className="col-md-1">{el.room.capacity}</td>
                    <td className="col-md-1">{el.term.season} {el.term.year}</td>
                    <td className="col-md-4">{el.time.start} - {el.time.end}</td>
                    <td className="col-md-1"><button className="col-md-12 btn btn-info" type="submit" onClick={this.handleAdd(el.id)}>Add</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        )
      )
    }
    const TableSlot = () => {
      return(
        this.state.section.slot==undefined? (
          <p></p>
        ): (
          this.state.section.slot.length==0?(
            <p>Has no assigned slots</p>
          ) : (
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className="col-md-2">Day</td>
                  <td className="col-md-3">Building - Room</td>
                  <td className="col-md-1">Capacity</td>
                  <td className="col-md-1">Term</td>
                  <td className="col-md-4">Time</td>
                  <td className="col-md-1"></td>
                </tr>
              </thead>
              <tbody className="col-md-12">
                {this.state.section.slot.map(el=> (
                  <tr className="col-md-12" key={el.id}>
                    <td className="col-md-2">{el.day.name}</td>
                    <td className="col-md-3">{el.room.building.code} - {el.room.number}</td>
                    <td className="col-md-1">{el.room.capacity}</td>
                    <td className="col-md-1">{el.term.season} {el.term.year}</td>
                    <td className="col-md-4">{el.time.start} - {el.time.end}</td>
                    <td className="col-md-1"><button className="btn btn-info" type="submit" onClick={this.handleRemove(el.id)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          
        )
      )
    }
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <div className="col-md-12">
              <Link to={{
                pathname: '/admin/update-section-master-p2',
                state: {
                  id: this.state.id
                }
              }} className="col-md-2 btn btn-success float-right">Next</Link>
            </div>
            <h2 className="col-md-12 text-center">Current Slots</h2>
            <TableSlot />
            <form className="col-md-12" onSubmit={this.handleFind}>
              <br />
              <h2 className="col-md-12 text-center">Search For Opening Slot</h2>
              {this.state.section.slot!=undefined && this.state.section.slot.length!=0?(
                <p>{this.state.section.slot[0].term.season} {this.state.section.slot[0].term.year}</p>
              ) : (
                <p></p>
              )}
              <TermSearch onChange={this.handleTerm.bind(this)} termList={this.state.termList} />
              <BuildingSearch onChange={this.handleBuilding.bind(this)} buildingList={this.state.buildingList}/>
              <RoomSearch onChange={this.handleRoom.bind(this)} roomList={this.state.roomList} />
              <TimeSearch onChange={this.handleTime.bind(this)} timeList={this.state.timeList} />
              <DaySearch onChange={this.handleDays.bind(this)} mon={this.state.days.MO} tues={this.state.days.TU} wed={this.state.days.WE} thurs={this.state.days.TH} />
              <button className="btn btn-info" type="submit">Search for Slot</button>
            </form>
            <Slot />
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}



export default UpdateSectionMaster;
