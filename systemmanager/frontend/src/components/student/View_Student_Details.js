import React, { Component } from 'react';
import {Link } from "react-router-dom";
// import Component from '---';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class StudentSectionDetails extends Component {
  state = {
    enrollment:undefined,
    gradeList:undefined,
    attendanceList:undefined,
    result: undefined,
    isAssignGrade: false,
  }
  componentDidMount(){
    axios
    .get(`/enrollment-details.json/${this.props.data.state.course_section_id}/${this.props.state.studentEmail}`)
    .then(res=>{
      this.setState({enrollment:res.data.data})
      axios
      .get(`/attendance-list.json`,{
        params:{enrollment_id:res.data.data.id}
      })
      .then(res=>{this.setState({attendanceList:res.data.datas})})
    })
    .catch(err=>{this.setState({result:err})})
    axios
    .get(`/grade-list.json`,{
      params:{
        'student_email':this.props.data.state.studentEmail,
        'course_section_id':this.props.data.state.course_section_id
      }
    })
    .then(res=>{
      this.setState({gradeList:res.data.data})
    })
  }
  render(){
    const GradeTable = () =>{
      {this.state.gradeList==undefined?(
        <p></p>
      ):(
        <div className="col-md-12">
          <h4 className="col-md-12 text-center"><strong>Grades</strong></h4>
          {this.state.gradeList.length==0?(
            <p className="col-md-12">No Grades were assigned</p>
          ):(
            <div className="col-md- p-0 m-0">
              {this.state.gradeList.map(el=>(
                <p className="col-md-">{el.type=='F'?('Final'):('Midterm')}: {el.letterGrade}</p>
              ))}
            </div>
          )}
        </div>
      )}
    }
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        {this.state.section==undefined?(
          <p></p>
        ):(
          <section className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10 border rounded p-4 m-4">
                <h2 className="col-md-12 text-center"><strong>{this.state.enrollment.course_section.id} - {this.state.enrollment.student.user.firstName} {this.state.enrollment.student.user.lastName}</strong></h2>
                {this.state.isAssignGrade==false?(
                  <GradeTable/>
                ):(
                  <form>
                    AssignGrade
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
        <Footer />
      </React.Fragment>
    )
  }
}

export default StudentSectionDetails;
