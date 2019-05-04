import React, { PureComponent } from 'react';
import axios from 'axios';


import DepartmentSearch from '../inputs/Building_List_Search.js';
import CourseNameSearch from '../inputs/Course_Name_Search';
import CourseIDSearch from '../inputs/Course_ID_Search';

class SearchCourseList extends PureComponent {
  state = {
    department: undefined,
    departmentList: undefined,
    courseName: undefined,
    courseID: undefined
  }
  componentDidMount(){
    axios
    .get('department-list.json')
    .then(res => (
      this.setState({departmentList: res.data})
    ));
  }
  handleDepartment = (event) => {
    this.setState({department: event.target.value})
  }
  handleCourseName = (event) => {
    this.setState({courseName: event.target.value})
  }
  handleCourseID = (event) => {
    this.setState({courseID: event.target.value})
  }
  render () {
    const {CourseTable} = this.props
    
    return (
      <React.Fragment>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <form className="col-md-12" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <DepartmentSearch onChange={this.handleDepartment.bind(this)} departmentList={this.state.departmentList}/>
                <CourseNameSearch onChange={this.handleCourseName.bind(this)} />
                <CourseIDSearch onChange={this.handleCourseID.bind(this)} />
                <br />
                <button type="submit" className="btn btn-primary">Submit</button> 
              </div>
            </form>
          </div>
        </section>
      </React.Fragment>
    )
  }
}
export default SearchCourseList;