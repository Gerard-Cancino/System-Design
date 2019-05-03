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

class CreateCourseForm extends Component {
  componentDidMount() {
  }

  render(){
    const {department, } = this.props
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
                <DaySearch onChange={this.handleDays.bind(this)} mon={this.state.days.MO} tues={this.state.days.TU} wed={this.state.days.WE} thurs={this.state.days.TH} fri={this.state.days.FR}/>
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

export default CreateCourseForm;
