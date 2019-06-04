import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import ProfileUser from '../general/User_Profile.js';
import StudentAdvisor from '../general/Student_Advisor.js';

class ViewStudentRecord extends Component {
  state = {
    studentUsername: undefined,
    student: undefined,
    placeholder: undefined,
    advisor: undefined,
    isLoaded: false,
    newAdvisor: undefined,
    majorList:undefined,
    minorList:undefined
  }

  handleChange = event => {
    this.setState({ studentUsername: event.target.value || undefined});
    //console.log(this.state.studentUsername);
  }
  handleAdvisor = event => {
    this.setState({newAdvisor: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
    .get(`/student-details.json/${this.state.studentUsername}`)
    .then(res => {
      this.setState({
        student: res.data.data,
        isLoaded: true
      })
      axios
      .get(`/advisor-details.json/${res.data.data.user.email}`)
      .then( res=> {
        this.setState({
          advisor: res.data.data,
          result: res
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
        email:this.state.studentUsername
      }
    })
    .then(res=>{
      this.setState({majorList:res.data.data})
      axios
      .get(`/faculty-list.json`,{
        params:{
          department:res.data.data[0].major.department.code
        }
      })
      .then(res=>{
        this.setState({facultyList:res.data.data})
        this.setState({newAdvisor:res.data.data[0].user.id})
      })
      .catch(err=>{
        this.setState({result:err})
        axios
        .get(`/faculty-list.json`)
        .then(res=>{
          this.setState({facultyList:res.data.data})
          this.setState({newAdvisor:res.data.data[0].user.id})
        })
        .catch(err=>{
          this.setState({result:err})
        })
      })
    })
    axios
    .get(`/student-minor-list.json`,{
      params:{
        email:this.state.studentUsername
      }
    })
    .then(res=>{
      this.setState({minorList:res.data.data})
    })
  }
  handleSubmit0 = event => {
    event.preventDefault();
    axios
      .put(`/user-details.json/${this.state.studentUsername}`, {
        'isLockout': false,
      })
      .then(res => {    
        axios
        .get(`/student-details.json/${this.state.studentUsername}`)
        .then(res => {
          this.setState({
            student: res.data.data,
            result: res,
            isLoaded: true
        })
      })
      .catch(err=>{
        this.setState({result:err})
      })
    })
  }  
  handleSubmit1 = event => {
    event.preventDefault();
    axios
      .put(`/user-details.json/${this.state.studentUsername}`,{
        'isLockout': true,
      })
      .then(res => {
        axios
        .get(`/student-details.json/${this.state.studentUsername}`)
        .then(res => {
          this.setState({
            student: res.data.data,
            result: res,
            isLoaded: true
        })
        .catch(err=>{
          this.setState({result:err})
        })
      })
    })
  }
  updateAdvisor = (e) =>{
    e.preventDefault();
    axios
    .post(`/advisor-list.json`,{
      faculty:this.state.newAdvisor,
      email:this.state.student.user.email
    })
    .then(res=>{
      this.setState({advisor:res.data.data,result:res})
    })
    .catch(err=>{
      this.setState({result:err})
    })

  }


  render(){
    const Lock = () =>
      this.state.student.user.isLockout==true?(
        <div className="col-md-12">
          <hr />
          <form className="col-md-12">
            <div className="form-group col-md-12"> 
              <button onClick={this.handleSubmit0} type="submit" className="col-md-12 btn btn-success">Unlock Account</button> 
            </div>
          </form>
        </div>
      ) : (
        <div className="col-md-12">
          <hr />
          <form className="col-md-12">
            <div className="form-group col-md-12">
              <button onClick={this.handleSubmit1} type="submit" className="col-md-12 btn btn-danger">Lock Account</button> 
            </div>
          </form>
        </div>
      );
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">View Student Information</h2>
            <form className="col-md-12" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentUsername"></label>
                <input type="text" className="form-control" id="studentUsername" placeholder="Enter Student's Username" onChange={this.handleChange}/>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button> 
              </div>
            </form>
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
                {!this.state.facultyList?(
                  <p></p>
                ):(
                  <form className="form-group" onSubmit={this.updateAdvisor}>
                    <label className="col-md-12" htmlFor="newAdvisor">Change Advisor</label>
                    <select onChange={this.handleAdvisor} className="col-md-8">
                      {this.state.facultyList.map(el=>(
                        <option value={el.user.id}>{el.user.firstName} {el.user.lastName}</option>
                      ))}
                    </select>
                    <button className="col-md-4 btn btn-primary" type="submit">Update Advisor</button>
                  </form>
                )}
                <br />
                <Lock/>
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
