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
    term: undefined,
    termList: [],
    time: undefined,
    timeList: [],
    faculty: undefined,
    facultyList: [],
    slot: undefined,
    isMon: false,
    isTues: false,
    isWed: false,
    isThurs: false,
    isLoaded: false,
  }
  componentWillMount(){
    this.setState({'id': this.props.data.state.id})
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
      })
    })
    axios
    .get('/time-list.json')
    .then(res => {
      this.setState({'timeList': res.data})
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
  handleDay = event => {
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
  handleSubmit = event => {
    // event.preventDefault();
    // axios
    //   .post(`/admin/add-student-hold/${this.state.studentUsername}/${this.state.holdSelected}.json`)
    //   .then(res => {
    //     this.setState({
    //       isSuccessful: res.data.isSuccessful,
    //       isLoaded: true
    //     })
    //   })
  }



  render(){
    
    // const Info = () =>
    //   !this.state.hold.length?(
    //     <p>No Holds in system or Could not connect to server to get holds</p>
    //   ) : (
    //     <div>
    //       <p><strong>Select a Hold</strong></p>
    //       <select onChange={this.handleChange1} value={this.state.holdSelected}>
    //         {this.state.hold.map(singleHold => (
    //           <option key={singleHold.name} value={singleHold.name} selected>{singleHold.name}: {singleHold.description}</option>
    //         ))}
    //       </select>
    //     </div>
    //   );
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
              <form onSubmit={this.handleFind}>
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
                <select className="form-control" onChange={this.handleRoom} value={this.state.room} defaultValue={undefined}>
                  <option value={undefined}>All Room</option>
                  {this.state.roomList.map(i => (
                    <option key={i.id} value={i.id}>{i.number}</option>
                  ))}
                </select>
                <label>Time:</label>
                <select className="form-control" onChange={this.handleTime} value={this.state.time} defaultValue={undefined}>
                  <option value={undefined}>All Times</option>
                  {this.state.timeList.map(el => (
                    <option key={el.id}>{el.start} - {el.end}</option>
                  ))}
                </select>
                <button className="btn" type="submit">Search for Slot</button>
              </form>
              <h2 className="col-md-12 text-center">Add Slot to Section</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit1}>
                <label>Slot:</label>
                <table>
                  <thead>
                    <tr>
                      <th>Slot Number</th>
                      <th>Slot Time</th>
                      <th>Slot Day</th> 
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <select>

                </select>
                <button></button>
              </form>
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
