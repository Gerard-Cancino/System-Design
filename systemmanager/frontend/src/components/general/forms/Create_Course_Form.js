import React, { Component } from 'react';
import axios from 'axios';

import CreditInput from '../inputs/Credit_Input.js'
import CourseIDSearch from '../inputs/Course_ID_Search.js'
import CourseNameSearch from '../inputs/Course_Name_Search.js';
import DepartmentSearch from '../inputs/Department_Search.js';
import DescriptionInput from '../inputs/Description_Input.js';


class CreateCourseForm extends Component {
  state={
    isInCatalog: undefined
  }
  componentDidMount() {
    this.setState({isInCatalog:this.props.isInCatalog})
  }
  componentWillReceiveProps(props){
    this.setState({isInCatalog:props.isInCatalog})
  }
  render(){
    const {departmentList, handleDepartment, handleDescription, handleCourseName, handleCourseID, handleNumOfCredits, handleSubmit, handleIsInCatalog, isInCatalog} = this.props
    return(
      <React.Fragment>
        <h2 className="text-center">Create Course</h2>
        <form className="col-md-12" onSubmit={handleSubmit}>
          <DepartmentSearch onChange={handleDepartment.bind(this)} departmentList={departmentList} isRequired={true} />
          <CourseNameSearch onChange={handleCourseName.bind(this)} isRequired={true} />
          <CourseIDSearch onChange={handleCourseID.bind(this)} isRequired={true}/>
          <CreditInput onChange={handleNumOfCredits.bind(this)} isRequired={true} />
          <DescriptionInput onChange={handleDescription.bind(this)} isRequired={true} />
          {/* <div className="form-check"> 
            <label className="form-check-label">Is this a Graduate Course</label>
          </div>
          <div className="form-check">
            <input value={isGraduate} onChange={handleisGraduate} className="form-check-input" type="checkbox" />
            <p className="text-secondary">Leave blank if false</p>
          </div> */}
          {this.state.isInCatalog==undefined?(
            <p>loading</p>
          ):(
            <div className="form-group radio col-md-12">
              <label>Course is in Catalog?</label>
              <label>
                <input type="radio" value={true} checked={this.state.isInCatalog == true} onChange={handleIsInCatalog}/>
                True
              </label>
              <label>
                <input type="radio" value={false} checked={this.state.isInCatalog == false} onChange={handleIsInCatalog}/>
                False   
              </label>
            </div> 
          )}
          <br />
          <button type="submit" className="btn btn-primary">Submit</button> 
        </form>
      </React.Fragment>
    );
  }
}

export default CreateCourseForm;
