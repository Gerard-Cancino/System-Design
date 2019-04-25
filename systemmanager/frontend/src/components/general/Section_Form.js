import React, { Component } from 'react';
import axios from 'axios';

import CreditsSearch from './Credits_Search.js'
import CourseIDSearch from './Course_ID_Search.js'
import CourseNameSearch from './Course_Name_Search.js';
import DaySearch from './Day_Search.js';
import DepartmentSearch from './Department_Search.js';
import FacultyNameSearch from './Faculty_Name_Search.js';
import TermSearch from './Term_Search.js';
import TimeSearch from './Time_Search.js';

class SearchMasterSchedule extends Component {
  state = {
    timeList: undefined,
    termList: undefined,
    term: undefined,
    courseSect: undefined,
    departmentList: undefined,
    department: undefined,
    courseName: undefined,
    courseID: undefined, 
    facultyLastName: undefined,
    creditMin: undefined,
    creditMax: undefined,
    time: undefined,
    days: {
      MO: true,
      TU: true,
      WE: true,
      TH: true,
    },
    isReload: false
  }

  componentDidMount() {
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
          termList: res.data
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
  handleTerm = event => {
    this.setState({term: event.target.value});
  }
  handleDepartment = event => {
    this.setState({department: event.target.value});
  }
  handleCourseName= event => {
    this.setState({courseName: event.target.value});
  }
  handleCourseID= event => {
    this.setState({courseID: event.target.value});
  }
  handleFacultyName= event => {
    this.setState({facultyLastName: event.target.value});
  }
  handleCreditMin= event => {
    this.setState({creditMin: event.target.value});
  }
  handleCreditMax= event => {
    this.setState({creditMax: event.target.value});
  }
  handleTime= event => {
    this.setState({time: event.target.value});
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
  
  handleSubmit = event => {
    event.preventDefault();
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
          courseSect: res.data,
        })
      })
  }
  
  SearchCourseSection = (isReload) => {
    if(isReload) {
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
          courseSect: res.data,
          isReload: false
        })
      })
    }    
  }

  render(){
    const {SectionTable} = this.props
    return(
      <React.Fragment>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">Search Master Schedule</h2>
            <form className="col-md-12" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TermSearch onChange={this.handleTerm.bind()} termList={this.state.termList}/>
                <DepartmentSearch onChange={this.handleDepartment.bind(this)} departmentList={this.state.departmentList}/>
                <CourseNameSearch onChange={this.handleCourseName.bind(this)} />
                <CourseIDSearch onChange={this.handleCourseID.bind(this)} />
                <FacultyNameSearch onChange={this.handleFacultyName.bind(this)} />
                <TimeSearch onChange={this.handleTime.bind(this)} timeList={this.state.timeList}/>
                <CreditsSearch onChangeMin={this.handleCreditMin.bind(this)} onChangeMax={this.handleCreditMax.bind(this)} />
                <DaySearch onChange={this.handleDays.bind(this)} mon={this.state.days.MO} tues={this.state.days.TU} wed={this.state.days.WE} thurs={this.state.days.TH} />
                <br />
                <button type="submit" className="btn btn-primary">Submit</button> 
              </div>
            </form>
            <SectionTable sectionList={this.state.courseSect} SearchCourseSection={this.SearchCourseSection.bind(this)}/>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default SearchMasterSchedule;
