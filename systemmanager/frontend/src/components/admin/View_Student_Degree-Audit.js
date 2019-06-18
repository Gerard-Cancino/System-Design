import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import DegreeAuditTable from '../general/tables/Degree_Audit_Table.js';


class DegreeAudit extends Component {
  state = {
    email: undefined,
    transcriptList: undefined,
    majorList: undefined,
    minorList: undefined,
    status: undefined,
    result: undefined,
    overallGPA: undefined,
    nonRequirementList: undefined,
  }
  getNonMajor_MinorTranscript(){
    let requirementList = new Array();
    let nonMajorTranscript = new Array();
    if (this.state.majorList!=undefined){
      for (let major of this.state.majorList){
        for (let requirement of major.major.requirement){
          requirementList.push(requirement)
        }
      }
    }
    if (this.state.minorList!=undefined){
      for (let minor of this.state.minorList){
        for (let requirement of minor.minor.requirement){
          requirementList.push(requirement)
        }
      }
    }
    for (let transcript of this.state.transcriptList){
      let isExist = false;
      console.log(transcript.id)
      for (let requirement of requirementList){
        if(requirement.id==transcript.course.id){
          isExist = true;
        }
      }
      if(isExist==false){
        nonMajorTranscript.push(transcript);
      }
    }
    this.setState({"nonRequirementList":nonMajorTranscript})

  }
  getOverallGPA(transcriptList){
    let semesterTotalGPA = 0;
    let semesterCredits = 0;
    for(let i = 0;i<transcriptList.length;i++){
      if(transcriptList[i].gradeReceived!=undefined){
        if(transcriptList[i].gradeReceived=='A'){
          semesterTotalGPA += 4*parseInt(transcriptList[i].course.numberOfCredits);
          semesterCredits += transcriptList[i].course.numberOfCredits;
        }
        else if(transcriptList[i].gradeReceived=='B'){
          semesterTotalGPA += 3*parseInt(transcriptList[i].course.numberOfCredits);
          semesterCredits += transcriptList[i].course.numberOfCredits;
        }
        else if(transcriptList[i].gradeReceived=='C'){
          semesterTotalGPA += 2*parseInt(transcriptList[i].course.numberOfCredits);
          semesterCredits += transcriptList[i].course.numberOfCredits;
        }
        else if(transcriptList[i].gradeReceived=='D'){
          semesterTotalGPA += 1*parseInt(transcriptList[i].course.numberOfCredits);
          semesterCredits += transcriptList[i].course.numberOfCredits;
        }
        else if(transcriptList[i].gradeReceived=='F'){
          semesterTotalGPA += 0*parseInt(transcriptList[i].course.numberOfCredits);
          semesterCredits += transcriptList[i].course.numberOfCredits;
        }
      }
    }
    this.setState({overallGPA:(semesterTotalGPA/semesterCredits).toString().substring(0,4)})
  }
  getTranscript(){
    axios
    .get(`/transcript-list.json/${this.state.email}`)
    .then(res=>{
      this.setState({transcriptList: res.data.data,result:res})
      this.getOverallGPA(res.data.data)
    })
    .catch(err=>{
      this.setState({result: err,transcriptList:undefined});
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
      this.setState({majorList:res.data.data,result:res})
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
      this.setState({minorList:res.data.data,result:res})
    })
  }
  componentDidMount(){
  }
  componentDidUpdate(){
    
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
    if(this.state.transcriptList!=undefined&&this.state.nonRequirementList==undefined&&this.state.majorList!=undefined&&this.state.minorList!=undefined){
      this.getNonMajor_MinorTranscript()
    }
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4">
              <h2 className="col-md-12 text-center">View Student's Degree Audit</h2>
              <form className="col-md-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Student</label>
                  <input className="form-control" onChange={this.handleChange} name="email" placeholder="username" required/>
                </div>
                <button type="submit" className="col-md-12 btn btn-primary">Get Degree Audit</button>
              </form>
              <br />
              {this.state.transcriptList==undefined?(
                <p></p>
              ):(
                this.state.transcriptList.length==0?(
                  <p className="text-center col-md-12">Student is not enrolled in any class nor has he taken any class</p>
                ):(
                  <div className="col-md-12">
                  <h3 className="col-md-12 text-center">{this.state.transcriptList[0].student.user.firstName} {this.state.transcriptList[0].student.user.lastName}</h3>
                  <p className="col-md-12 text-right">Overall GPA: {this.state.overallGPA}</p>
                  
                  {this.state.majorList==undefined?(null):(this.state.majorList.map(major=>(
                    <DegreeAuditTable transcriptSectionList={this.state.transcriptList} major={major.major} isMajor={true}/>
                  )))}
                  {this.state.minorList==undefined?(null):(this.state.minorList.map(minor=>(
                    <DegreeAuditTable transcriptSectionList={this.state.transcriptList} major={minor.minor} isMajor={false}/>
                  )))}
                  {this.state.nonRequirementList==undefined || this.state.nonRequirementList.length==0?(
                    <p></p>
                  ):(
                    <div className="col-md-12">
                      <h5 className="col-md-12 text-center">Non-Required Courses</h5>
                      <table className="table table-striped"> 
                        <thead style={{backgroundColor:"#696969", color:"white"}}>
                          <tr> 
                            <td>Status</td>
                            <td>Course ID</td>
                            <td>Name</td>
                            <td>Grade</td>
                            <td>GPA</td>
                            <td>Credits</td>
                            <td>Term</td>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.nonRequirementList.map(transcript=>(
                              transcript.gradeReceived==undefined?(
                                <tr className="table-warning">
                                  {transcript.gradeReceived==undefined?(
                                    <td>P</td>
                                  ):(
                                    <td>C</td>
                                  )}
                                  <td>{transcript.course.id}</td>
                                  <td>{transcript.course.name}</td>                        
                                  <td>{transcript.gradeReceived}</td>
                                  {transcript.gradeReceived==undefined?(<td></td>):(null)}        
                                  {transcript.gradeReceived=='A'?(<td><p>4</p></td>):(null)}
                                  {transcript.gradeReceived=='B'?(<td><p>3</p></td>):(null)}
                                  {transcript.gradeReceived=='C'?(<td><p>2</p></td>):(null)}
                                  {transcript.gradeReceived=='D'?(<td><p>1</p></td>):(null)}
                                  {transcript.gradeReceived=='F'?(<td><p>0</p></td>):(null)}
                                  <td>{transcript.course.numberOfCredits}</td>
                                  <td>{transcript.season} {transcript.year}</td>
                                </tr>
                              ):(
                                <tr className="table-success">
                                  {transcript.gradeReceived==undefined?(
                                    <td>P</td>
                                  ):(
                                    <td>C</td>
                                  )}
                                  <td>{transcript.course.id}</td>
                                  <td>{transcript.course.name}</td>                        
                                  <td>{transcript.gradeReceived}</td>
                                  {transcript.gradeReceived==undefined?(<td></td>):(null)}        
                                  {transcript.gradeReceived=='A'?(<td><p>4</p></td>):(null)}
                                  {transcript.gradeReceived=='B'?(<td><p>3</p></td>):(null)}
                                  {transcript.gradeReceived=='C'?(<td><p>2</p></td>):(null)}
                                  {transcript.gradeReceived=='D'?(<td><p>1</p></td>):(null)}
                                  {transcript.gradeReceived=='F'?(<td><p>0</p></td>):(null)}
                                  <td>{transcript.course.numberOfCredits}</td>
                                  <td>{transcript.season} {transcript.year}</td>
                                </tr>
                              )
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                )
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
