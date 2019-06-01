import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import TimeSearch from '../general/inputs/Time_List_Search.js';
import DaySearch from '../general/inputs/Day_Search.js';


// View Course Catalog -> Add (Button) -> Fill out Required 
// -> (optional inputs) -> submit -> return json of for course id to master
class UpdateSectionMaster extends Component {
  state = {
    id: undefined,
    section: [],
    slot: undefined,
    slotList: undefined,
    time: undefined,
    timeList: undefined,
    days: {
      MO: true,
      TU: true,
      WE: true,
      TH: true,
      FR: true,
    }
  }
  componentDidMount(){
    this.setState({'id': this.props.data.state.id})
    axios
    .get(`/course-section-details.json/${this.props.data.state.id}`)
    .then(res => {
      this.setState({'section': res.data.data})
      this.compareSlot()
    })
    axios
    .get('/time-list.json')
    .then(res => {
      this.setState({'timeList': res.data.data})
    })
  }
  handleFind = event => {
    event.preventDefault();
    axios
      .get('/slot-list.json',{
        params: {
          'time': this.state.time,
          'monday': this.state.days.MO,
          'tuesday': this.state.days.TU,
          'wednesday': this.state.days.WE,
          'thursday': this.state.days.TH,
          'friday': this.state.days.FR
        }
      })
      .then(res => {
        this.setState({'slotList': res.data.data})
        this.compareSlot()
      })
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
    else if (event.target.value=='FR')
    if(selectedDay.FR == false)
      selectedDay.FR = true;
    else
      selectedDay.FR = false;
    this.setState(selectedDay)
  }
  handleAdd = (slot) => (event) => {
    event.preventDefault()
    axios
    .put(`/course-section-details.json/${this.state.id}`, {
      'slot': slot
    })
    .then(res => {
      this.setState({section:res.data.data,result:undefined})
      axios
      .get('/slot-list.json',{
        params: {
          'time': this.state.time,
          'monday': this.state.days.MO,
          'tuesday': this.state.days.TU,
          'wednesday': this.state.days.WE,
          'thursday': this.state.days.TH,
          'friday': this.state.days.FR
        }
      })
      .then(res => {
        this.setState({'slotList': res.data.data})
        this.compareSlot()
      })
    })
    .catch(err => {
      this.setState({result:err})
    })
  }
  handleRemove = (slot) => (event) => {
    event.preventDefault()
    axios
    .put(`/course-section-details.json/${this.state.id}`, {
      'slot': slot
    })
    .then(res => {
      this.setState({section:res.data.data,result:undefined})
      axios
      .get('/slot-list.json',{
        params: {
          'time': this.state.time,
          'monday': this.state.days.MO,
          'tuesday': this.state.days.TU,
          'wednesday': this.state.days.WE,
          'thursday': this.state.days.TH,
          'friday': this.state.days.FR
        }
      })
      .then(res => {
        this.setState({'slotList': res.data.data})
        this.compareSlot()
      })
    })
  }
  compareSlot () {
    if(this.state.section.slot.length>0){
      let slotList = this.state.slotList;
      let currentSlotList = this.state.section.slot
      for(let i=0;i<currentSlotList.length;i++){
        for(let j=0;j<slotList.length;j++){
          if(slotList[j].id==currentSlotList[i].id){
            slotList.splice(j,1)
          }
        }
      }
      this.setState({'slotList':slotList})
    }
  }

  render(){
    
    const Slot = () => {
      return(
        this.state.slotList==undefined?(
          <p></p>
        ) : (
          <form className="col-md-12">
            <hr />
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className="col-md-4">Day</td>
                  <td className="col-md-7">Time</td>
                  <td className="col-md-1"></td>
                </tr>
              </thead>
              <tbody className="col-md-12">
                {this.state.slotList.map(el=> (
                  <tr className="col-md-12" key={el.id}>
                    <td className="col-md-4">{el.day.name}</td>
                    <td className="col-md-7">{el.time.start} - {el.time.end}</td>
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
                  <td className="col-md-4">Day</td>
                  <td className="col-md-7">Time</td>
                  <td className="col-md-1"></td>
                </tr>
              </thead>
              <tbody className="col-md-12">
                {this.state.section.slot.map(el=> (
                  <tr className="col-md-12" key={el.id}>
                    <td className="col-md-4">{el.day.name}</td>
                    <td className="col-md-7">{el.time.start} - {el.time.end}</td>
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
        <Header res={this.state.result}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <div className="col-md-12">
              <Link to={{
                pathname: '/admin/view-section-list'
              }} className="col-md-2 btn btn-success float-right">Back to Master Schedule</Link>
            </div>
            <h2 className="col-md-12 text-center">Current Slots</h2>
            <TableSlot />
            <form className="col-md-12" onSubmit={this.handleFind}>
              <br />
              <h2 className="col-md-12 text-center">Search For Opening Slot</h2>
              <TimeSearch onChange={this.handleTime.bind(this)} timeList={this.state.timeList} />
              <DaySearch onChange={this.handleDays.bind(this)} mon={this.state.days.MO} tues={this.state.days.TU} wed={this.state.days.WE} thurs={this.state.days.TH} fri={this.state.days.FR}/>
              <button className="btn btn-info" type="submit">Search for Slot</button>
              <p className="text-secondary">Four slots is the maxed for each section</p>
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
