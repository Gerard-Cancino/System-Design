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
    isReload: false,
    isLoading: false
  }

  componentDidMount() {
    if(this.props.term!=undefined){
      this.setState({term:this.props.term.id})
    } 
    axios
      .get('/department-list.json')
      .then(res => {
        this.setState({
          departmentList: res.data.data
        })
      })
    axios
      .get('/term-list.json')
      .then(res =>{
        this.setState({
          termList: res.data.data
        })
      })
    axios
      .get('/time-list.json')
      .then(res => {
        this.setState({
          timeList: res.data.data
        })
      })
  }
  componentWillReceiveProps(newProps){
    if(newProps.term!=undefined){
      this.setState({term:newProps.term.id})
    }
  }
  handleTerm = event => {
    this.setState({term: event.target.value || undefined});
  }
  handleDepartment = event => {
    this.setState({department: event.target.value || undefined});
  }
  handleCourseName= event => {
    this.setState({courseName: event.target.value || undefined});
  }
  handleCourseID= event => {
    this.setState({courseID: event.target.value || undefined});
  }
  handleFacultyName= event => {
    this.setState({facultyLastName: event.target.value || undefined});
  }
  handleCreditMin= event => {
    this.setState({creditMin: event.target.value || undefined});
  }
  handleCreditMax= event => {
    this.setState({creditMax: event.target.value || undefined});
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
    this.setState({'isLoading':true})
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
          courseSect: res.data.data,isLoading:false
        })
      })
      .catch(err =>{
        this.setState({
          courseSect:[]
        }) 
        this.props.handleResult(err)
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
          courseSect: res.data.data,
          isReload: false
        })
      })

    }    
  }
  render(){
    const {SectionTable,student,handleResult} = this.props;
    return(
      <React.Fragment>
        <div className="col-md-12">
          <form className="col-md-12" onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.props.term==undefined?(
                <TermSearch onChange={this.handleTerm.bind()} termList={this.state.termList}/>
              ):(
                <div className="form-group col-md-12">
                  <label>Term</label>
                  <input className="form-control" placeholder={this.props.term.season +" "+ this.props.term.year} disabled />
                </div>
              )}

              <DepartmentSearch onChange={this.handleDepartment.bind(this)} departmentList={this.state.departmentList}/>
              <CourseNameSearch onChange={this.handleCourseName.bind(this)} />
              <CourseIDSearch onChange={this.handleCourseID.bind(this)} />
              <FacultyNameSearch onChange={this.handleFacultyName.bind(this)} />
              <TimeSearch onChange={this.handleTime.bind(this)} timeList={this.state.timeList}/>
              <CreditsSearch onChangeMin={this.handleCreditMin.bind(this)} onChangeMax={this.handleCreditMax.bind(this)} />
              <DaySearch onChange={this.handleDays.bind(this)} mon={this.state.days.MO} tues={this.state.days.TU} wed={this.state.days.WE} thurs={this.state.days.TH} fri={this.state.days.FR}/>
              <br />
              <button type="submit" className="btn btn-primary">Submit</button> 
            </div>
          </form>
          {this.state.isLoading==false?(
            <p></p>
          ):(
            <p className="col-md-12 text-center">Searching...</p>
          )}
          {this.state.courseSect==undefined?(
            <p></p>
          ):(
            this.props.handleEnroll!=undefined?(
              <SectionTable handleEnroll={this.props.handleEnroll.bind(this)} handleResult={handleResult.bind(this)} student={student} sectionList={this.state.courseSect} SearchCourseSection={this.SearchCourseSection.bind(this)}/>
            ):(            
              <SectionTable handleResult={handleResult.bind(this)} student={student} sectionList={this.state.courseSect} SearchCourseSection={this.SearchCourseSection.bind(this)}/>
            )
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default SectionForm;
