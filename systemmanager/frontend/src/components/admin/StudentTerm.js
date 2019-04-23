import React,{Component} from 'react'
import axios from 'axios'

import Header from './layout/Header.js'
import Footer from './layout/Footer.js'

class StudentTerm extends Component{
  state = {
    timeList: [],
    termList: [],
    term: '',
    courseSect: [],
    departmentList: [],
    department: '',
    courseName: '',
    courseID: '', 
    facultyLastName: '',
    creditMin: '',
    creditMax: '',
    time: '',
    days: {
      MO: true,
      TU: true,
      WE: true,
      TH: true,
    },
    isSuccessful: '',
    isLoading: false,
    test: '',

    studentUsername: '',
    student: undefined,
    enrollment: undefined,
  }
  componentWillMount() {
    axios
      .get('/department-list.json')
      .then(res => {
        this.setState({
          departmentList: res.data,
        })
      })
    axios
      .get('/term-list.json')
      .then(res =>{
        this.setState({
          termList: res.data,
        })
      })
    axios
      .get('/time-list.json')
      .then(res => {
        this.setState({
          timeList: res.data,
        })
      })
  }
  handleChange = event => {
    this.setState({term: event.target.value});
  }
  handleChange1 = event => {
    this.setState({department: event.target.value});
  }
  handleChange2= event => {
    this.setState({courseName: event.target.value});
  }
  handleChange3= event => {
    this.setState({courseID: event.target.value});
  }
  handleChange4= event => {
    this.setState({facultyLastName: event.target.value});
  }
  handleChange5= event => {
    this.setState({creditMin: event.target.value});
  }
  handleChange6= event => {
    this.setState({creditMax: event.target.value});
  }
  handleChange7= event => {
    this.setState({time: event.target.value});
  }
  handleChange9 = event => {
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
    event.preventDefault();
    this.setState({'isLoading': true});
    axios
      .get('/course-section-list.json', {
        params: {
          'department': this.state.department,
          'courseName': this.state.courseName,
          'courseID': this.state.courseID,
          'facultyLastName': this.state.facultyLastName,
          'creditMin': this.state.creditMin,
          'creditMax': this.state.creditMax,
          'time': this.state.time,
          'monday': this.state.days.MO,
          'tuesday': this.state.days.TU,
          'wednesday': this.state.days.WE,
          'thursday': this.state.days.TH,
          'term': this.state.term,
        }
      })
      .then(res => {
        this.setState({
          isLoaded: true,
          isLoading: false,
          courseSect: res.data,
        })
      })
  }
  handlerStudent = event => {
    event.preventDefault()
    this.setState({studentUsername: event.target.value});
  }
  handlerFindStudent = event => {
    event.preventDefault();
    axios
    .get(`/student-details.json/${this.state.studentUsername}`)
    .then(res => {
      this.setState({student: res.data})
    })
  }
  handlerEnrollStudent = (event,section) => {
    event.preventDefault()
    axios
    .post(`/enrollment-list.json`,{
      section: section,
      student: this.state.studentUsername,
    })
    .then( res => {
      enrollment: res.data
    })
  }
  FindStudent = () => {
    return (
      <div className="col-md-12">
        <h2 className="text-center">Find Student</h2>
        <form onSubmit={this.handlerFindStudent}>
          <label htmlFor="studentUsername">Student's Username</label>
          <input className="form-control" type="text" value={this.state.studentUsername} placeholder="Enter Student's Username" onChange={this.handlerStudent}/>
          <button>Find Student</button>
        </form>
      </div>
    )
  };
  FindSection = () => {
    const Term = this.Term;
    const Time = this.Time;
    const Info = this.Info;
    if (this.state.student!=undefined)
      return (
        <form className="col-md-12" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Term />
            <Info />
            <label htmlFor="courseName">Course Name:</label>
            <input className="form-control" id="courseName" placeholder="Enter Course Name" onChange={this.handleChange2}/>
            <label htmlFor="courseID">Course ID:</label>
            <input className="form-control" id="courseID" placeholder="Enter Course ID" onChange={this.handleChange3}/>
            <label htmlFor="facultyLastName">Faculty Last Name</label>
            <input className="form-control" id="facultyLastName" placeholder="Enter Faculty's Last Name" onChange={this.handleChange4}/>
            <label htmlFor="creditMin">Credits Minimum:</label>
            <input className="form-control" id="creditMin" placeholder="Enter Credit Minimum" onChange={this.handleChange5}/>
            <label htmlFor="creditMax">Credits Maximum:</label>
            <input className="form-control" id="CreditMax" placeholder="Enter Credit Maximum" onChange={this.handleChange6}/>
            <Time />
            <label htmlFor="checkboxes">Days:</label>
            <div id="checkboxes">
              <input type="checkbox" name="day1" value="MO" onChange={this.handleChange9} checked={this.state.days.MO}/>Monday
              <input type="checkbox" name="day2" value="TU" onChange={this.handleChange9} checked={this.state.days.TU}/>Tuesday
              <input type="checkbox" name="day3" value="WE" onChange={this.handleChange9} checked={this.state.days.WE}/>Wednesday
              <input type="checkbox" name="day4" value="TH" onChange={this.handleChange9} checked={this.state.days.TH}/>Thursday
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Submit</button> 
          </div>
        </form>
      )
    else
      return (
        <p></p>
      )
  }
  Tables = () => { 
    return (    
      <div>
        {this.state.isLoading?(
          <p>Loading</p>
        ) : (
          <p></p>
        )}
        {this.state.isSuccessful == ''?(
            <p></p>
          ) : (
          this.state.isSuccessful?(
            <p>Section Successfully removed</p>
          ):(
            <p>Failed to remove section</p>
          )
        )}
        {this.state.courseSect.length != 0 ? (
          <div className="col-md-12">
            <h2 className="col-md-12 text-center">Search Results</h2>
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className='col-md-1'>ID</td>
                  <td className='col-md-3'>Course</td>
                  <td className='col-md-1'>Section</td>
                  <td className='col-md-1'>Professor</td>
                  <td className='col-md-1'># of Credits</td>
                  <td className='col-md-2'>Time</td>
                  <td className='col-md-1'>Term</td>
                  <td className='col-md-1'>Building-Room</td> 
                  <td className='col-md-1'># of Available Seats</td>
                  <td className='col-md-1'></td>
                  <td className='col-md-1'></td>
                </tr>
              </thead>
              <tbody className="col-md-12">
                {/* need extra conditions for null values*/}
                {this.state.courseSect.map(el => (
                  <tr className="col-md-12" key={el.id}>
                    <td className='col-md-1'>{el.id}</td>
                    <td className='col-md-3'>{el.course.name}</td>
                    <td className='col-md-1'>{el.number}</td>
                    {el.faculty?(
                      <td className='col-md-1'>{el.faculty.user.lastName}</td>
                    ):(
                      <td className='col-md-1'>TBA</td>
                    )}
                    <td className='col-md-1'>{el.course.numberOfCredits}</td>              
                    {el.slot.length == 0?(                      
                    <td className='col-md-2'> 
                      <p>TBD</p>
                    </td>
                    ) : (
                    el.slot.map(i => (                
                    <td className='col-md-2'>   
                      <p>{i.day.name} {i.time.start}-{i.time.end}</p>
                    </td> 
                    )))}
                    {el.slot.length == 0?(
                      <td className='col-md-1'> 
                        <p>TBD</p> 
                      </td> 
                    ) : (
                      <td className='col-md-1'> 
                        <p>{el.slot[0].term.season} {el.slot[0].term.year}</p>
                      </td> 
                    )}
                    {el.slot.length == 0?(                      
                    <td className='col-md-1'> 
                      <p>TBD</p>
                    </td>
                    ) : (
                    el.slot.map(i => (                
                    <td className='col-md-1'> 
                      <p>{el.slot[0].room.building.name} {el.slot[0].room.number}</p>
                    </td> 
                    )))}
                    <td className='col-md-1'>{el.numOfSeats - el.numOfTaken}</td>     
                    <td className="col-md-6">
                      <button className="btn btn-info" onClick={(e) => this.handlerEnrollStudent(e,el.id)}>Register</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
        this.state.isLoaded?(
          <p>Cannot find any course sections</p>          
        ) : (
          <p></p>
        )
      )}

      </div>
    )
  }     
  Term = () => {
    return (
      this.state.termList.length ==0?(
        <p>No Terms are found.  If this is an error, please contact admin.</p>
      ) : (
        <div>
          <label>Term:</label>
          <select className="form-control" onChange={this.handleChange} value={this.state.term}>
            <option value=''>All Terms</option>
            {this.state.termList.map(single => (
              <option key={single.id} value={single.id}>{single.season}: {single.year}</option>
            ))}
          </select>
        </div>
      )
    )
  }
  Time = () => {
    return (
      this.state.timeList.length == 0?(
        <p>No Times are found.  If this is an error, please contact admin.</p>
      ) : (
        <div>
          <label>Time:</label>
          <select className="form-control" onChange={this.handleChange7} value={this.state.time}>
            <option value=''>All Times</option>
            {this.state.timeList.map(single => (
              <option key={single.id} value={single.id}>{single.start} - {single.end}</option>
            ))}
          </select>
        </div>
      )
    )
  }
  Info = () => {
    return (
      this.state.departmentList.length == 0?(
        <p>No Departments found.  If this is an error, please contact admin.</p>
      ) : (
        <div>
          <label>Department:</label>
          <select className="form-control" onChange={this.handleChange1} value={this.state.department}>
            <option value=''>All Departments</option>
            {this.state.departmentList.map(single => (
              <option key={single.code} value={single.code}>{single.code}: {single.name}</option>
            ))}
          </select>
        </div>
      )
    )
  }
  Enrollment = ()  => {
    this.state.enrollment?(
      <table>
        <thead>
          <tr>
            <td className='col-md-1'>ID</td>
            <td className='col-md-3'>Course</td>
            <td className='col-md-1'>Section</td>
            <td className='col-md-1'>Professor</td>
            <td className='col-md-1'># of Credits</td>
            <td className='col-md-2'>Time</td>
            <td className='col-md-1'>Term</td>
            <td className='col-md-1'>Building-Room</td> 
            <td className='col-md-1'># of Available Seats</td>
            <td className='col-md-1'></td>
          </tr>
        </thead>
        <tbody>
          {this.state.enrollment.map(el => (
            <tr className="col-md-12" key={el.id}>
              <td className='col-md-1'>{el.id}</td>
              <td className='col-md-3'>{el.course.name}</td>
              <td className='col-md-1'>{el.number}</td>
              {el.faculty?(
                <td className='col-md-1'>{el.faculty.user.lastName}</td>
              ):(
                <td className='col-md-1'>TBA</td>
              )}
              <td className='col-md-1'>{el.course.numberOfCredits}</td>              
              {el.slot.length == 0?(                      
              <td className='col-md-2'> 
                <p>TBD</p>
              </td>
              ) : (
              el.slot.map(i => (                
              <td className='col-md-2'>   
                <p>{i.day.name} {i.time.start}-{i.time.end}</p>
              </td> 
              )))}
              {el.slot.length == 0?(
                <td className='col-md-1'> 
                  <p>TBD</p> 
                </td> 
              ) : (
                <td className='col-md-1'> 
                  <p>{el.slot[0].term.season} {el.slot[0].term.year}</p>
                </td> 
              )}
              {el.slot.length == 0?(                      
              <td className='col-md-1'> 
                <p>TBD</p>
              </td>
              ) : (
              el.slot.map(i => (                
              <td className='col-md-1'> 
                <p>{el.slot[0].room.building.name} {el.slot[0].room.number}</p>
              </td> 
              )))}
              <td className='col-md-1'>{el.numOfSeats - el.numOfTaken}</td>     
              <td className="col-md-6">
                <button className="btn btn-info" onClick={(e) => this.handlerEnrollStudent(e,el.id)}>Unregister</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p></p>
    )
  }
  render() {     

    const FindSection = this.FindSection;
    const Tables = this.Tables;
    const FindStudent = this.FindStudent
    return (
      <React.Fragment>
        <Header />
        <section className="col-md-12 container-fluid h-100">
          <div className="col-md-12 row border rounded m-4 p-4 h-100">
            <FindStudent />
            <FindSection />
            <Tables />
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default StudentTerm;