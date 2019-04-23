import React, { Component } from 'react';
import axios from 'axios';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';


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
    faculty: undefined,
    facultyList: [],
    isMon: true,
    isTues: true,
    isWed: true,
    isThurs: true,
    isLoaded: false,
  }
  componentWillMount(){
    this.setState({'id': this.props.data.state.id})
    axios
    .post('/slot-list.json')
    .then(res => {
      this.setState({'termList': res.data})
      this.setState({'term':res.data[0].id})
    })
    axios
    .get('/term-list.json')
    .then(res => {
      this.setState({'termList': res.data})
      this.setState({'term':res.data[0].id})
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
    axios
    .get(`/course-section-details.json/${this.props.data.state.id}`)
    .then(res => {
      this.setState({'section': res.data})
      this.setState({'faculty': res.data.faculty.user.id})
      axios
      .get('/faculty-list.json', {
        params: {
          'department': this.state.section.course.department.code
        }
      })
      .then( res => {
        this.setState({
          'facultyList': res.data,
          isLoaded: true
        })
      })
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
  handleFaculty = event => {   
  this.setState({ faculty: event.target.value });
  }
  handleMon = event => {
    console.log(event.target.value)
    if (this.state.isMon==true)
      this.setState({'isMon': false});
    else
      this.setState({'isMon': true});
  }
  handleTues = event => {
    console.log(event.target.value)
    if (this.state.isTues==true)
      this.setState({'isTues': false});
    else
      this.setState({'isTues': true});
  }
  handleWed = event => {
    console.log(event.target.value)
    if (this.state.isWed==true)
      this.setState({'isWed': false});
    else
      this.setState({'isWed': true});
  }
  handleThurs = event => {
    console.log(event.target.value)
    if (this.state.isThurs==true)
      this.setState({'isThurs': false});
    else
      this.setState({'isThurs': true});
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
        this.state.section.slot.length!=0?(
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
      this.state.isLoaded? (
        <React.Fragment>
          <Header />
          <section className="container-fluid h-100">
            <div className="row border rounded m-4 p-4 h-100">
              <h2 className="col-md-12 text-center">Update Section to Master</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit}>
                {this.state.section.course == null?(
                  <p></p>
                ) : (
                  <h4>{this.state.section.course.name} - Section: {this.state.section.number}</h4>
                )}
                <label>Number of Seats:</label>
                <input placeholder={this.state.section.numOfSeats}></input>
                <p className="text-secondary">Number of Seats Currently Taken: {this.state.section.numOfTaken}</p>
                <label>Faculty's Name:</label>
                {/*list of all faculty*/}
                <select className="form-control" onChange={this.handleFaculty} value={this.state.faculty}>
                  {this.state.facultyList.map(i => (
                    <option key={i.user.id} value={i.user.id}>{i.user.firstName} {i.user.lastName}</option>
                  ))}
                </select>
                <button className="btn btn-primary">Submit</button>
              </form>
              <hr />
              <form className="col-md-12" onSubmit={this.handleFind}>
                <h2>Search For Openning Slot</h2>
                {/*previous prereq*/}
                <label>Term:</label>
                <select required className="form-control" onChange={this.handleTerm} value={this.state.term}>
                  {this.state.termList.map(i => (
                    <option key={i.id} value={i.id}>{i.season} {i.year}</option>
                  ))}
                </select>
                {/*search rooms in building*/}
                <label>Building:</label>
                <select className="form-control" onChange={this.handleBuilding} value={this.state.building}>
                  {this.state.buildingList.map(i => (
                    <option key={i.code} value={i.code}>{i.code}</option>
                  ))}
                </select>
                {/*search if room is available at that slot*/}
                {/*search if capacity already exceeds the current enrollment*/}
                <label>Room:</label>
                <select className="form-control" onChange={this.handleRoom} value={this.state.room}>
                  {this.state.roomList.map(i => (
                    <option key={i.id} value={i.id}>{i.number}</option>
                  ))}
                </select>
                <label>Time:</label>
                <select className="form-control" onChange={this.handleTime} value={this.state.time}>
                  {this.state.timeList.map(el => (
                    <option key={el.id}>{el.start} - {el.end}</option>
                  ))}
                </select>
                <div id="checkboxes">
                  <input type="checkbox" name="day1" onChange={this.handleMon} checked={this.state.isMon}/>Monday
                  <input type="checkbox" name="day2" onChange={this.handleTues} checked={this.state.isTues}/>Tuesday
                  <input type="checkbox" name="day3" onChange={this.handleWed} checked={this.state.isWed}/>Wednesday
                  <input type="checkbox" name="day4" onChange={this.handleThurs} checked={this.state.isThurs}/>Thursday
                </div>
                <button className="btn" type="submit">Search for Slot</button>
              </form>
              <TableSlot />
              <Slot />
            </div>
          </section>
          <Footer />
        </React.Fragment>
      ) : (
        <p>Loading. Please wait.</p>

      )
      
    );
  }
}



export default UpdateSectionMaster;
