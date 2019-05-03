import React, { Component } from 'react';
import axios from 'axios';

import CreditsSearch from '../inputs/Credits_Search.js'
import CourseIDSearch from '../inputs/Course_ID_Search.js'
import CourseNameSearch from '../inputs/Course_Name_Search.js';
import DaySearch from '../inputs/Day_Search.js';
import DepartmentSearch from '../inputs/Department_Search.js';
import FacultyNameSearch from '../inputs/Faculty_Name_Search.js';
import TermSearch from '../inputs/Term_List_Search.js';
import TimeSearch from '../inputs/Time_List_Search.js';

class SectionForm extends Component {
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
      FR: true,
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
    this.setState({term: event.target.value || undefined});
  }
  handleDepartment = event => {
    this.setState({department: event.target.value || undefined});
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
    this.setState({time: event.target.value || undefined});
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
          'friday': this.state.days.FR,
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
          'friday': this.state.days.FR,
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
            <h2 className="text-center col-md-12">Create Course</h2>
            <form>
              <label>Department</label>
              <input />
              <label>Number</label>
              <label>Name</label>
              <label>Description</label>
              <label>Number of Credits</label>
              <label>Is Graduate Course</label> 
            </form>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default SectionForm;
