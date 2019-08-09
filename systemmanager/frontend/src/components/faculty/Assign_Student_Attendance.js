import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';
// import Component from '---';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

function checkTerm() {
  let today = new Date();
  let year = parseInt(today.getFullYear());
  // Spring november 4 2019 to january 27 2020
  // Fall April 1 to Sept 1
  // Fall + Spring
  let month = parseInt(today.getMonth());
  // Spring
  if((month>=1&&month<=8)){
    let beginTerm = new Date((year),'01','04');
    let endTerm = new Date(year+1,'09','27');
    console.log(beginTerm)
    console.log(endTerm)
    if(beginTerm<today&&today<endTerm){
      return ({season: 'SP',year:year});
    }
  }
  // Fall
  else if((month>=9&&month<=12)){
    let beginTerm = new Date(year,'03','01');
    let endTerm = new Date(year,'9','28');
    console.log(beginTerm)
    console.log(endTerm)
    if(beginTerm<today&&today<endTerm){
      return ({season: 'F',year:year});
    }
  }
  return undefined;
}


class AssignStudentAttendance extends Component {
  state = {
    enrollmentList:undefined,
    attendanceList:undefined,
    submitAttendanceList:{},
    comparedList: undefined,
    result:undefined,
    isCorrectTerm:false,
    doesMatch:false,
    hasAttendance:false,
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
      let submitAttendanceList = new Map();
      enrollment.data.data.map(el=>{
        submitAttendanceList.set(el.student.user.id,'false');
      })
      this.setState({submitAttendanceList:submitAttendanceList})
      axios
      .get('/attendance-list.json',{
        params:{
          course_section_id:this.props.data.state.courseSectionID,
        }
      })
      .then(res=>{
        this.setState({attendanceList:res.data.data})
      })
    })
  }
  shouldMatchDate(section){
    const today = new Date();
    let isMatch = false;
    if(section!=undefined){
      for (let slot of section.slot)
        if (slot.day.id==today.getDay())
          isMatch = true;
      console.log(isMatch)
      console.log(today.getDay())
      this.setState({doesMatch:isMatch})
    }
  }
  shouldMatchTerm(term){
    const todayTerm = checkTerm();
    if(term.season == todayTerm.season && term.year==todayTerm.year){
      this.setState({isCorrectTerm:true})
    }
    else{
      this.setState({isCorrectTerm:false})
    }
  }
  componentDidMount(){
    axios
    .get(`/course-section-details.json/${this.props.data.state.courseSectionID}`)
    .then(res=>{this.setState({courseSection:res.data.data})
      this.shouldMatchDate(res.data.data)
      this.shouldMatchTerm(res.data.data.term)
    })
    this.getEnrollmentAttendance()
  }
  getAttendance(){
    axios
    .get(`/attendance-list.json`,{
      params:{
        course_section_id:this.props.data.state.courseSectionID
      }
    })
    .then(res=>{
      this.setState({attendanceList:res.data.data})
      if(res.data.data.length==0)
        this.setState({hasAttendance:false})
    })
  }
  handleAttendance(e,studentID){
    let submitAttendanceList = this.state.submitAttendanceList;
    submitAttendanceList.set(studentID,e.target.value)
    this.setState({submitAttendanceList:submitAttendanceList})
  }
  submitAttendance = (e) =>{
    e.preventDefault();
    let submitAttendanceList = this.state.submitAttendanceList;
    let itMap = submitAttendanceList.keys()
    let current = itMap.next()
    while(!current.done){
      console.log(current.value)
      console.log(submitAttendanceList.get(current.value))
      axios
      .post(`/attendance-list.json`,{
        course_section_id:this.props.data.state.courseSectionID,
        student_id:current.value,
        isPresent:submitAttendanceList.get(current.value)
      })
      .then(res=>{this.setState({result:res})})
      .catch(err=>{this.setState({result:err})})
      current = itMap.next()
      if(current.done){
        this.setState({hasAttendance:true}) 
      }
    }
  }
  render(){
    const today = new Date()
    if(this.state.hasAttendance){
      this.getAttendance();
    }
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user} />
        <section className="container-fluid" >
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4">
              <h3 className="col-md-12 text-center">Assign Attendance</h3>
              <h5 className="col-md-12 text-center">{today.getMonth()+1}-{today.getDate()}-{today.getFullYear()}</h5>
              {this.state.doesMatch==false || this.state.isCorrectTerm==false?(
                this.state.doesMatch==false?(
                  <p className="col-md-12 text-center">The class does not occur on this date</p>
                ):(
                  <p className="col-md-12 text-center">Attendance cannot be assigned to this term</p>
                )
              ):(
                this.state.enrollmentList==undefined||this.state.attendanceList==undefined?(
                  <p className="col-md-12 text-center">Loading...</p>
                ):(
                  <div>
                    <p className="col-md-12 text-center text-secondary">Once submitted attendance cannot be assigned for today</p>
                      {this.state.enrollmentList.length==0?(
                        <p className="col-md-12 text-center">No students are enrolled in this class</p>
                      ):(
                    <form onSubmit={this.submitAttendance}>
                      <table className="table table-striped">
                        <thead style={{backgroundColor:"#696969", color:"white"}}>
                          <tr><td>Student ID</td><td>Student Name</td><td>Is Present</td></tr>
                        </thead>
                        <tbody>
                          {this.state.attendanceList!=0?(
                            this.state.attendanceList.map(el=>(
                              <tr>
                                <td>{el.enrollment.student.user.id}</td>
                                <td>{el.enrollment.student.user.firstName} {el.enrollment.student.user.lastName}</td>
                                <td>{el.isPresent==false?("No"):("Yes")}</td>
                              </tr>
                            ))
                          ):(
                            this.state.enrollmentList.map(el=>(
                              <tr>
                                <td>{el.student.user.id}</td>
                                <td>{el.student.user.firstName} {el.student.user.lastName}</td>
                                <td>
                                  <label>
                                    <input type="radio" value='true' checked={this.state.submitAttendanceList.get(el.student.user.id) == 'true'} onChange={e=>this.handleAttendance(e,el.student.user.id)}/>
                                    Yes
                                  </label>
                                  <label>
                                    <input type="radio" value='false' checked={this.state.submitAttendanceList.get(el.student.user.id) == 'false'} onChange={e=>this.handleAttendance(e,el.student.user.id)}/>
                                    No   
                                  </label>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                      {this.state.attendanceList.length!=0?(
                        <p></p>
                      ):(
                        <button type="submit" className="col-md-12 btn btn-primary">Submit Attendance</button>
                      )}
                    </form>
                  )
                }
              </div>
                )
              )}
            </div>
          </div>
        </section>

        <Footer />
      </React.Fragment>
    )
  }
}

export default AssignStudentAttendance;
