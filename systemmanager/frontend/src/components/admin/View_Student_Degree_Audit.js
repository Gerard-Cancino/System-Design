import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';


class DegreeAudit extends Component {
  state = {
    email: undefined,
    transcriptList: undefined,
    majorList: undefined,
    minorList: undefined,
    status: undefined
  }
  getTranscript(){
    axios
    .get(`/transcript-list.json/${this.state.email}`)
    .then(res=>{
      this.setState({transcriptList: res.data})
    })
    .catch(err=>{
      this.setState({status: err});
    })
  }
  getStudentMajorList(){
    axios
    .get(`/student-major-list.json`,{
      params:{
        email:this.state.email
      }
    })
    .then(res=>{
      this.setState({majorList:res.data})
    })
    .catch(err=>{
      this.setState({status:err})
    })
  }
  getStudentMinorList(){
    axios
    .get(`/student-minor-list.json`,{
      params:{
        email:this.state.email
      }
    })
    .then(res=>{
      this.setState({minorList:res.data})
    })
    .catch(err=>{
      this.setState({status:err})
    })
  }
  compareCourses(el){
    for(let i = 0;i<this.state.transcriptList.length;i++){
      if(this.state.transcriptList[i].course.id==el.id){
        if(this.state.transcriptList[i].gradeReceived==undefined){
          return (
            <tr className="table-warning">
              <td >P</td>
              <td >{el.id}</td>
              <td >{el.name}</td>
              <td >{this.state.transcriptList[i].gradeReceived}</td>
              <td >{this.state.transcriptList[i].season} {this.state.transcriptList[i].year}</td>
            </tr>
          )
        }
        else {
          return (
            <tr className="table-success">
              <td >C</td>
              <td >{el.id}</td>
              <td >{el.name}</td>
              <td >{this.state.transcriptList[i].gradeReceived}</td>
              <td >{this.state.transcriptList[i].season} {this.state.transcriptList[i].year}</td>
            </tr>
          )
        }
      }
      console.log('teset')
    }
    return (
      <tr>
        <td ></td>
        <td >{el.id}</td>
        <td >{el.name}</td>
        <td ></td>
        <td ></td>
      </tr>)
  }
  componentDidMount(){
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value || undefined;
    this.setState(prevState => {
      const newState = {...prevState};
      newState[name] = value;
      return newState;
    })
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    this.getTranscript();
    this.getStudentMajorList()
    this.getStudentMinorList()
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4">
              <h2 className="col-md-12 text-center">View Student's Degree Audit</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Student</label>
                  <input className="form-control" onChange={this.handleChange} name="email" placeholder="username"/>
                </div>
                <button type="submit" className="col-md-12 btn btn-primary">Get Degree Audit</button>
              </form>
              <br />
              {this.state.transcriptList==undefined || this.state.majorList == undefined || this.state.majorList.length==0?(
                <p></p>
              ):(
                <div className="col-md-12">
                  <h4 className="col-md-12 text-center">{this.state.transcriptList[0].student.user.firstName} {this.state.transcriptList[0].student.user.lastName}</h4>
                  
                  {this.state.majorList.map(major=>(
                  <div className="col-md-12">
                    <h5 className="col-md-12 text-center">{major.major.type} in {major.major.name}</h5>
                    <table className="table table-striped">
                      <thead style={{backgroundColor:"#696969", color:"white"}}>
                        <tr>
                          <td >Status</td>
                          <td >Course ID</td>
                          <td >Course Name</td>
                          <td >Grade</td>
                          <td >Season - Year</td>
                        </tr>
                      </thead>
                      <tbody >
                        {major.major.requirement.map(req=>(
                          this.compareCourses(req)
                        ))}
                      </tbody>
                    </table>
                  </div>
                  ))}
                </div>
              )}
              {this.state.transcriptList==undefined || this.state.minorList == undefined || this.state.minorList.length==0?(
                <p></p>
              ):(
                <div className="col-md-12">
                  {this.state.minorList.map(minor=>(
                  <div className="col-md-12">
                    <h5 className="col-md-12 text-center">Minor in {minor.minor.name}</h5>
                    <table className="table table-striped">
                      <thead style={{backgroundColor:"#696969", color:"white"}}>
                        <tr>
                          <td >Status</td>
                          <td >Course ID</td>
                          <td >Course Name</td>
                          <td >Grade</td>
                          <td >Season - Year</td>
                        </tr>
                      </thead>
                      <tbody >
                        {minor.minor.requirement.map(req=>(
                          this.compareCourses(req)
                        ))}
                      </tbody>
                    </table>
                  </div>
                  ))}
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

export default DegreeAudit;
