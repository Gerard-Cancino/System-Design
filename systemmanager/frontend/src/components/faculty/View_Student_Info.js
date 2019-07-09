import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import {Link} from 'react-router-dom'

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

// const getDays = (slotList) =>{
//   let today = new date().now();
//   let start = new date(today.getYear(),0,15);
//   let end = new date(today.getYear(),5,15);
//   let dayListToCheck = [];
//   let dayList = [];
//   for (slot of slotList){
//     if(slot.day.name=="SU")
//       dayListToCheck.append(0);
//     else if(slot.day.name=="MO")
//       dayListToCheck.append(1);
//     else if(slot.day.name=="TU")
//       dayListToCheck.append(2);
//     else if(slot.day.name=="WE")
//       dayListToCheck.append(3);
//     else if(slot.day.name=="TH")
//       dayListToCheck.append(4);
//     else if(slot.day.name=="FR")
//       dayListToCheck.append(5);
//     else if(slot.day.name=="SA")
//       dayListToCheck.append(6)
//   }
//   while (start<=today && start<=end){
//     dayOfWeek = start.getDay();
//     if (dayListToCheck.includes(dayOfWeek))
//       dayList.push(new Date(start))
//     start = start.addDays(1);
//   }
//   return dayList
// }

// const processDays = (attendanceList) => {
//   let processedDay = [];
  
// }

// const processAttendance = (attendanceList) => {
//   let dayList = getDays(attendanceList[0].enrollment.course_section.slot)
  
// }

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
    attendanceList: undefined
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
  }

  render(){
    console.log("reloading page");
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <div className="col-md-12">
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
