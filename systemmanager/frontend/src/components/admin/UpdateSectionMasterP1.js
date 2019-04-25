import React, { Component } from 'react';
import axios from 'axios';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import BuildingSearch from '../general/Building_List_Search.js';
import TermSearch from '../general/Term_Search.js';
import TimeSearch from '../general/Time_Search.js';
import DaySearch from '../general/Day_Search.js';


// View Course Catalog -> Add (Button) -> Fill out Required 
// -> (optional inputs) -> submit -> return json of for course id to master
class UpdateSectionMaster extends Component {
  state = {
    id: undefined,
    section: [],
    building: undefined,
    buildingList: [],
    room: undefined,
    roomList: [],
    slot: undefined,
    slotList: [],
    term: undefined,
    termList: [],
    time: undefined,
    timeList: [],
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
          this.setState({'term':res.data[0].id})
        })
      else
        this.setState({
          termList: res.data.slot[0].term.id,
          term: res.data.slot[0].term.id
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
    console.log('test')
    axios
      .get('/slot-list.json',{
        params: {
          'room': this.state.room,
          'building': this.state.building,
          'term': this.state.term,
          'monday': this.state.isMon,
          'tuesday': this.state.isTues,
          'wednesday': this.state.isWed,
          'thursday': this.state.isThurs,
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
      this.setState({'room': undefined})
    });
  }
  handleRoom = event => {   
    this.setState({ room: event.target.value });
  }
  handleTerm = event => {   
    this.setState({ term: event.target.value });
  }
  handleTime = event => {   
    this.setState({ time: event.target.value });
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
      this.setState({section:res.data})
      axios
      .get('/slot-list.json',{
        params: {
          'room': this.state.room,
          'building': this.state.building,
          'term': this.state.term,
          'monday': this.state.isMon,
          'tuesday': this.state.isTues,
          'wednesday': this.state.isWed,
          'thursday': this.state.isThurs,
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
      axios
      .get('/slot-list.json',{
        params: {
          'room': this.state.room,
          'building': this.state.building,
          'term': this.state.term,
          'monday': this.state.isMon,
          'tuesday': this.state.isTues,
          'wednesday': this.state.isWed,
          'thursday': this.state.isThurs,
        }
      })
      .then(res => {
        this.setState({'slotList': res.data})
      })
    })
  }

  render(){
    
    const Slot = () => {
      return(
        this.state.slotList.length!=0?(
          <form >
            <table>
              <thead>
                <tr>
                  <td>Day</td>
                  <td>Building - Room</td>
                  <td>Term</td>
                  <td>Time</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {this.state.slotList.map(el=> (
                  <tr key={el.id}>
                    <td>{el.day.name}</td>
                    <td>{el.room.building.code} - {el.room.number}</td>
                    <td>{el.term.season} {el.term.year}</td>
                    <td>{el.time.start} - {el.time.end}</td>
                    <td><button type="submit" onClick={this.handleAdd(el.id)}>Add</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        ) : (
          <p>Could not find any slots</p>
        )

      )
    }
    const TableSlot = () => {
      return(
        this.state.section.slot=undefined?(
          <table>
            <thead>
              <tr>
                <td>Day</td>
                <td>Building - Room</td>
                <td>Term</td>
                <td>Time</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.state.section.slot.map(el=> (
                <tr key={el.id}>
                  <td>{el.day.name}</td>
                  <td>{el.room.building.code} - {el.room.number}</td>
                  <td>{el.term.season} {el.term.year}</td>
                  <td>{el.time.start} - {el.time.end}</td>
                  <td><button type="submit" onClick={this.handleRemove(el.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Does not have selected slots</p>
        )
      )
    }
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <form className="col-md-12" onSubmit={this.handleFind}>
              <h2>Search For Openning Slot</h2>
              {/*previous prereq*/}
              <TermSearch onChange={this.handleTerm.bind(this)} termList={this.state.termList} />
              {/*search rooms in building*/}
              <BuildingSearch onChange={this.handleBuilding.bind(this)} buildingList={this.state.buildingList}/>
              {/*search if room is available at that slot*/}
              {/*search if capacity already exceeds the current enrollment*/}
              <label>Room:</label>
              <select className="form-control" onChange={this.handleRoom} value={this.state.room}>
                {this.state.roomList.map(i => (
                  <option key={i.id} value={i.id}>{i.number}</option>
                ))}
              </select>
              <TimeSearch onChange={this.handleTime.bind(this)} timeList={this.state.timeList} />
              <DaySearch onChange={this.handleDays.bind(this)} mon={this.state.days.MO} tues={this.state.days.TU} wed={this.state.days.WE} thurs={this.state.days.TH} />
              <button className="btn" type="submit">Search for Slot</button>
            </form>
            <TableSlot />
            <Slot />
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}



export default UpdateSectionMaster;
