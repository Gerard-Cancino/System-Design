import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewClassRoster extends Component {
  state = {
    enrollmentList: undefined,
    courseSection:undefined
  }
  componentDidMount(){
    this.getClassRoster();
  }
  getClassRoster = () => {
    axios
    .get(`/course-section-details.json/${this.props.data.state.courseSectionID}`)
    .then(res=>{this.setState({courseSection:res.data.data})})
    axios
    .get(`/enrollment-list.json`,{
      params:{
        section:this.props.data.state.courseSectionID
      }
    })
    .then(res=>{this.setState({enrollmentList: res.data.data})
    })
    .catch(err=>{this.setState({result:err})})
  }

  render(){
    const Tables = () => (
      this.state.enrollmentList == undefined?(
        <p></p>
      ):(
        this.state.enrollmentList.length == 0? (
          <p><br></br>Roster: None, check with an admin if this is incorrect</p>
        ):(
          <div className="col-md-12">
            <table className="table table-striped">
              <thead style={{backgroundColor:"#696969", color:"white"}}>
                <tr>
                  <td>Student ID</td>
                  <td>Student Name</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {this.state.enrollmentList.map(el => (
                  <tr key={el.id}>
                    <td>{el.student.user.id}</td>
                    <td>{el.student.user.firstName} {el.student.user.lastName}</td>
                    <td><Link to={{
                      pathname:"/faculty/view-student-info",
                      state:{enrollmentID:el.id,
                        courseSectionID:this.props.data.state.courseSectionID,
                        studentEmail:el.student.user.email}
                      }}className="col-md-12 btn btn-info">View Student</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )
    )
    console.log("reloading page");
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded p-4 m-4">
            {this.state.courseSection==undefined?(
              <p className="col-md-12 text-center">Loading...</p>
            ):(
              <h2 className="col-md-12 text-center">{this.state.courseSection.id} {this.state.courseSection.course.name} - {this.state.courseSection.number}</h2>
            )}
            <h4 className="col-md-12 text-center">Class Roster</h4>
              {this.state.enrollmentList == undefined?(
                <p></p>
              ):(
                <Tables />
              )}
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewClassRoster;
