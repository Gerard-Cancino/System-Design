import React, { Component } from 'react';
import axios from 'axios';

import CreditsSearch from '../inputs/Credits_Search.js'
import CourseIDSearch from '../inputs/Course_ID_Search.js'
import CourseNameSearch from '../inputs/Course_Name_Search.js';
import DepartmentSearch from '../inputs/Department_Search.js';


class CreateCourseForm extends Component {
  
  componentDidMount() {
  }

  render(){
    const {departmentList, handleDepartment, handleDescription, handleCourseName, handleCourseID, handleNumOfCredits, handleSubmit, handleisGraduate, isGraduate} = this.props
    return(
      <React.Fragment>
        <h2 className="text-center">Create Course</h2>
        <form className="col-md-12" onSubmit={handleSubmit}>
          <div className="form-group col-md-12">
            <label>Department</label>
            {departmentList==undefined?(
              <p></p>
            ):(
              <select className="form-control" onChange={handleDepartment}>
                {departmentList.map(el=>(
                  <option key={el.code} value={el.code}>{el.code} {el.name}</option>
                ))}
              </select> 
            )}
          </div>
          <CourseNameSearch onChange={handleCourseName.bind(this)} />
          <CourseIDSearch onChange={handleCourseID.bind(this)} />
          <div className="form-group col-md-12">
            <label>Number Of Credits</label>
            <input className="form-control" onChange={handleNumOfCredits} placeholder="1,2,3,4"/> 
          </div>
          <div className="form-group col-md-12">
            <label>Description</label>
            <textarea className="form-control" onChange={handleDescription} placeholder="Description" row="3"></textarea>
          </div>
          <div className="form-check"> 
            <label className="form-check-label">Is this a Graduate Course</label>
          </div>
          <div className="form-check">
            <input value={isGraduate} onChange={handleisGraduate} className="form-check-input" type="checkbox" />
            <p className="text-secondary">Leave blank if false</p>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">Submit</button> 
        </form>
      </React.Fragment>
    );
  }
}

export default CreateCourseForm;
