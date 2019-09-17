import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import {Link} from 'react-router-dom'

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

// Add Grade Too
function checkTerm() {
  let today = new Date();
  console.log(today);
  let year = parseInt(today.getFullYear());
  // Spring november 4 2019 to january 27 2020
  // Fall April 1 to Sept 1
  // Fall + Spring
  let month = parseInt(today.getMonth())+1;
  // Spring
  if((month>=1&&month<=9)){
    let beginTerm = new Date((year),'00','04');
    let endTerm = new Date(year,'08','27');
    console.log(beginTerm)
    console.log(endTerm)
    if(beginTerm<today&&today<endTerm){
      return ({season: 'SP',year:year});
    }
  }
  // Fall
  else if((month>=9&&month<=12)){
    let beginTerm = new Date(year,'03','01');
    let endTerm = new Date(year,'09','01');
    console.log(beginTerm)
    console.log(endTerm)
    if(beginTerm<today&&today<endTerm){
      return ({season: 'F',year:year});
    }
  }
  return undefined;
}


const ViewGradeList = (gradeList) => {
  const processGradeList = () => {
    let processedGradeList = {
      midterm: undefined,
      final: undefined
    }
    for (let grade of gradeList) {
      if (grade.type == 'M') {
        processedGradeList.midterm = grade.letterGrade;
      }
      else {
        processedGradeList.final = grade.letterGrade;
      }
    }
    return processedGradeList
  }
  const processedGradeList = processGradeList()
  return(
    <div className="col-md-12">
      {gradeList.map(el=>(
        el.type == 'M'?(
          <p className="float-left col-md-6">Midterm: {el.letterGrade}</p>
          ):(
            <p className="float-right col-md-6">Final: {el.letterGrade}</p>
          )
      ))}
      {processedGradeList.midterm==undefined?(<p className="float-left col-md-6">Midterm: TBA</p>):(null)}
      {processedGradeList.final==undefined?(<p className="float-right col-md-6">Final: TBA</p>):(null)}
    </div>
  )
}

const ViewAttendance = (attendanceList) => {
  return(
    <table className='table table-striped'>
      <thead style={{backgroundColor:"#696969", color:"white"}}>
        <tr>
          <td>Date</td>
          <td>Is Present?</td>
        </tr>
      </thead>
      <tbody>
        {attendanceList.map(el=>(
          el.isPresent==false?(
            <tr className="table-danger">
              <td>{el.dayAttended}</td>
              <td>N</td>
            </tr>
          ):(
            <tr className="table-success">
              <td>{el.dayAttended}</td>
              <td>Y</td>
            </tr>
          )
        ))}
      </tbody>
    </table>
  )
}

class ViewStudentInfo extends Component {
  state = {
    gradeList: undefined,
    attendanceList: undefined,
    section: undefined,
    isMatch:false,
  }
  componentDidMount(){
    axios
    .get(`/grade-list.json`,{
      params:{
        student_email:this.props.data.state.studentEmail,
        course_section_id:this.props.data.state.courseSectionID
      }
    })
    .then(res=>{
      this.setState({gradeList:res.data.data})
      axios
      .get(`/attendance-list.json`,{
        params:{
          course_section_id: this.props.data.state.courseSectionID,
          student_email:this.props.data.state.studentEmail
        }
      })
      .then(res=>{this.setState({attendanceList:res.data.data})})
      .catch(err=>{this.setState({result:err})})
    })
    .catch(err=>{
      this.setState({result:err})
    })
    axios
    .get(`/course-section-details.json/${this.props.data.state.courseSectionID}`)
    .then(res=>{
      this.setState({section:res.data.data})
    })
    .then(res=>{
      this.shouldMatchTerm();
    })
  }
  shouldMatchTerm(){
    if(this.state.section!=undefined){
      const term = checkTerm();
      if(term.season!=this.state.section.term.season||term.year!=this.state.section.term.year){
        this.setState({isMatch:false})
      }
      else{
        this.setState({isMatch:true})
      }
    }
  }

  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4">
            <div className="col-md-12">
            {this.state.isMatch==false?(
              <p className="float-right">Cannot assign or update grade at this time</p>
            ):(
              <React.Fragment>
                <Link to={{
                  pathname:"/faculty/update-student-grade",
                  state: {
                    student_username: this.props.data.state.studentEmail,
                    course_section_id: this.props.data.state.courseSectionID
                  }
                }} className="float-right col-md-3 btn btn-success">Update Grade</Link>
                <Link to={{
                  pathname:"/faculty/assign-student-grade",
                  state: {
                    studentEmail:this.props.data.state.studentEmail,
                    courseSectionID:this.props.data.state.courseSectionID
                  }
                }} className="float-right col-md-3 btn btn-info">Assign Grade</Link>
              </React.Fragment>
            )}
            </div>
            <h2 className="col-md-12 text-center">View Student Information</h2>
            {this.state.gradeList==undefined? (
              <p>Loading...</p>
            ) : (   
              ViewGradeList(this.state.gradeList)
            )}
            {this.state.attendanceList==undefined? (
              <p className="col-md-12 text-center">The student does not have any attendance recorded</p>
            ) : (
              ViewAttendance(this.state.attendanceList)
            )}

          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewStudentInfo;
