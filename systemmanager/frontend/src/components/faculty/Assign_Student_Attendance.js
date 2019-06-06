import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';
// import Component from '---';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

const ComparedListTable = (comparedList) => {
  return(
    comparedList==undefined?(
      <p></p>
    ):(
      comparedList.length==0?(
        <p>No Students are registered in this class</p>
      ):(
        <table>
          <thead>
            <tr>
              <td>Student</td>
              <td>Is Present</td>
            </tr>
          </thead>
        </table>
      )
    )
  )
}

const compareEnrollmentAttendance = (enrollmentList,attendanceList) => {
  let comparedList = [];
  for (let enrollment of enrollmentList){
    let isInAttendance = false;
    for (let attendance of attendanceList){
      if(attendance.enrollment.id == enrollment.id){
        isInAttendance = true;
        comparedList.push({comparedElement:{enrollment:enrollment,isAttend:attendance.isPresent}})
      }
    }
    if (!isInAttendance){
      comparedList.push({comparedElement:{enrollment:enrollment,isAttend:undefined}})
    }
  }
  return comparedList;
}

class AssignStudentAttendance extends Component {
  state = {
    enrollmentList:undefined,
    attendanceList:undefined,
    comparedList: undefined,
    result:undefined
  }
  getEnrollmentAttendance(){
    axios
    .get('/enrollment-list.json',{
      params:{
        section: this.props.data.state.courseSectionID
      }
    })
    .then(enrollment=>{
      this.setState({enrollmentList:enrollment.data.data})
      axios
      .get('/attendance-list.json',{
        params:{
          course_section_id:this.props.data.state.courseSectionID
        }
      })
      .then(res=>{
        this.setState({attendanceList:res.data.data})
        this.setState({comparedList:compareEnrollmentAttendance(enrollment.data.data,res.data.data)})
      })
    })
  }
  componentDidMount(){
    this.getEnrollmentAttendance()
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user} />
        <section className="container-fluid" >
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4">
              <h3 className="col-md-12 text-center">Assign Attendance</h3>
              <h4 className="col-md-12">{new Date().now()}</h4>
            </div>
          </div>
        </section>

        <Footer />
      </React.Fragment>
    )
  }
}

export default AssignStudentAttendance;
