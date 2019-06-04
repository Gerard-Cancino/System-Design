import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import ProfileUser from '../general/User_Profile.js';
import StudentAdvisor from '../general/Student_Advisor.js';

class ViewStudentRecord extends Component {
  state = {
    student: undefined,
    advisor: undefined,
    majorList:undefined,
    minorList:undefined
  }
  componentDidMount(){
    this.getStudentDetails();
  }
  getStudentDetails = () => {
    axios
    .get(`/student-details.json/${this.props.user}`)
    .then(res => {
      this.setState({
        student: res.data.data,
        isLoaded: true
      })
      axios
      .get(`/advisor-details.json/${this.props.user}`)
      .then( res=> {
        this.setState({
          advisor: res.data.data
        })
      })
      .catch(err=>{
        this.setState({result:err})
      })
    })
    .catch(err=>{
      this.setState({result:err})
    })
    axios
    .get(`/student-major-list.json`,{
      params:{
        email:this.props.user
      }
    })
    .then(res=>{
      this.setState({majorList:res.data.data})
    })
    axios
    .get(`/student-minor-list.json`,{
      params:{
        email:this.props.user
      }
    })
    .then(res=>{
      this.setState({minorList:res.data.data})
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">View Student Information</h2>
            {!this.state.student?(
              <p></p>
            ) : (
              <div className="col-md-12">
                <ProfileUser account={this.state.student.user} />
                <hr />
                {this.state.majorList==undefined?(
                  <p></p>
                ):(
                  this.state.majorList.length==0?(
                    <p>Student has no major</p>
                  ) : (
                    <div className="col-md-12">
                      <p><strong>Major:</strong></p>
                      {this.state.majorList.map(el=>(
                        <p>{el.major.name}</p>
                      ))}
                    </div>
                  )
                )}
                {this.state.minorList==undefined?(
                  <p></p>
                ):(
                  this.state.minorList.length==0?(
                    <p>Student has no minor</p>
                  ) : (
                    <div className="col-md-12">
                      <p><strong>Minor:</strong></p>
                      {this.state.minorList.map(el=>(
                        <p>{el.minor.name}</p>
                      ))}
                    </div>
                  )
                )}
                <hr />
                <StudentAdvisor advisor={this.state.advisor} />
              </div>
            )}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default ViewStudentRecord;
