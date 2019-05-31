import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import DepartmentSearch from '../general/inputs/Department_Search.js';

class ViewCourseCatalog extends Component {
  state = {
    course: undefined,
    status: undefined,
    departmentList: undefined,
    result: undefined,
  }

  getCourseList(department){
    axios
    .get('/course-list.json',{
      params:{
        department:department
      }
    })
    .then(res => {
      this.setState({
        course: res.data.data,
      })
    })
  }
  componentDidMount() {
    axios
    .get('/department-list.json')
    .then(res=>{
      this.setState({departmentList:res.data.data})
    })
    this.getCourseList(undefined)
  }
  handleDepartment = (e) => {
    console.log(e.target.value)
    this.getCourseList(e.target.value||undefined)
  }
  render(){
    const Tables = () => (
      this.state.course != undefined && this.state.course.length != 0? (
        <table className="table table-striped">
          <thead style={{backgroundColor:"#696969", color:"white"}}>
            <tr>
              <td>ID</td>
              <td>Course Name</td>
              <td># of Credits</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.state.course.map(el => (
              <tr key={el.id}>
                <td className='col-md-1'>{el.id}</td>
                <td className='col-md-4'>{el.name}</td>
                <td className='col-md-1'>{el.numberOfCredits}</td>
                <td className='col-md-3'>
                  <Link to={{
                    pathname: '/admin/create-section',
                    state: {courseID: el.id}
                  }} className="col-md-12 btn btn-success">Create Section</Link>
                </td>
                <td className='col-md-3'>
                  <Link to={{
                    pathname: '/admin/view-course-details',
                    state: {courseID: el.id}
                  }} className="col-md-12 btn btn-info">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      ) : (
        this.state.isLoaded?(
          <p>Cannot find any courses. This is an error. Please let admin know.</p>
        ) : (
          <p></p>
        )
      )
    )
    console.log("reloading page");
    return(
      <React.Fragment>
        <Header res={this.state.result}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4">
              <h2 className="col-md-12 text-center">View Course List</h2>
              {this.state.departmentList==undefined?(
                <p></p>
              ):(
                <div>
                  <DepartmentSearch onChange={this.handleDepartment.bind()} departmentList={this.state.departmentList} />
                  <br />
                  <Tables />
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewCourseCatalog;
