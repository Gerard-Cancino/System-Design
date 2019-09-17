import React,{Component} from 'react'
import axios from 'axios'

import Header from './layout/Header.js'
import Footer from './layout/Footer.js'

import SearchStudent from '../general/inputs/Student_Search.js'
import SearchSection from '../general/forms/Section_Form.js';
import EnrollmentTable from '../general/tables/Register_Enroll_Table.js';

function checkTerm() {
  let today = new Date();
  let year = parseInt(today.getFullYear());
  // Spring november 4 2019 to january 27 2020
  // Fall April 1 to Sept 1
  // Fall + Spring
  let month = parseInt(today.getMonth());
  // Spring
  if((month>10||month<2)){
    let beginTerm = new Date((year),'10','04');
    let endTerm = new Date(year+1,'01','27');
    if(beginTerm<today<endTerm){
      return ({season: 'SP',year:year+1});
    }
  }
  // Fall
  else if((month>5||month<10)){
    let beginTerm = new Date(year,'03','01');
    let endTerm = new Date(year,'08','01');
    if(beginTerm<today<endTerm){
      return ({season: 'F',year:year});
    }
  }
  return undefined;
}


class StudentTerm extends Component{
  state = {
    studentUsername: undefined,
    student: undefined,
    enrollment: undefined,
    isMissingPrereq: false,
    section: undefined,
    isLoading: false,
    result: undefined
  }
  componentDidMount() {
    this.getTerm()
  }
  getTerm = () => {
    let term = checkTerm()
    axios
    .get(`/term-details.json/${term.season}/${term.year}`)
    .then(res=>{
      this.setState({term:res.data.data})
    })
  }
  handleStudent = event => {
    this.setState({studentUsername: event.target.value});
  }
  handleFindStudent = event => {
    event.preventDefault();
    axios
    .get(`/student-details.json/${this.state.studentUsername}`)
    .then(res => {
      this.setState({student: res.data.data})
    })
    .catch(err =>{
      this.setState({result:err})
    })
  }
  handleEnrollStudent = (event,section,isConfirmed=false) => {
    event.preventDefault()
    this.setState({isLoading:true})
    axios
    .post(`/enrollment-list.json`,{
      section: section.id,
      student: this.state.studentUsername,
      admin: this.props.user,
      isConfirmed: isConfirmed
    })
    .then( res => {
      this.setState({enrollment: res.data.data,result:res,isLoading:false})
    })
    .catch(err=>{
      console.log(err)
      console.log(err.response.status)
      if(err.response.status===409){
        this.setState({isMissingPrereq:true,sectionID:section.id,isLoading:false})
      }
      else
        this.setState({result:err,isLoading:false})
    })
  }
  handlePrereqEnroll = (event,isEnabled) => {
    event.preventDefault()
    this.setState({isLoading:true})
    if(isEnabled){
      axios
      .post(`/enrollment-list.json`,{
        section: this.state.sectionID,
        student: this.state.studentUsername,
        admin: this.props.user,
        isConfirmed: true
      })
      .then( res => {
        this.setState({enrollment: res.data.data,result:res})
      })
      .then(res=>{
        this.setState({isMissingPrereq:false,sectionID:undefined,isLoading:false})
      })
      .catch(err=>{
        this.setState({result:err,isLoading:false})
      })
    }
    else{
      this.setState({isMissingPrereq:false,section:undefined,isLoading:false})
    }
  }
  handleSectionList = (event,sectionList) =>{
    this.setState({sectionList:sectionList});
  }
  handleResult = (result) =>{
    this.setState({result:result})
  }
  render() {     
    return (
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded p-4 m-4">
              {this.state.isLoading?(
                <div className="col-md-12">
                  <h2 className="text-center">Enroll Student</h2>
                  <p className="text-center">Please wait while we process the enrollment</p>
                </div>
              ):(
                this.state.student==undefined?(       
                  <div className="col-md-12">
                    <h4 className="col-md-12 text-center">Search Student</h4>
                    <form className="col-md-12" onSubmit={this.handleFindStudent}>
                      <SearchStudent onChange={this.handleStudent.bind(this)}/>
                      <button className="col-md-12 btn btn-primary" type="submit">Search Term</button>
                    </form>
                  </div>       
                ):(
                  !this.state.isMissingPrereq?(
                    <div className="col-md-12">
                      <h2 className="text-center">Enroll Student</h2>
                      <SearchSection isAdmin={true} handleEnroll={this.handleEnrollStudent.bind(this)} handleResult={this.handleResult.bind(this)} term={this.state.term} student={this.state.student} SectionTable={EnrollmentTable} />
                    </div>
                  ):(
                    <div className="col-md-12">
                      <h2 className="text-center">Enroll Student</h2>
                      <h4 className="text-center">The student is missing prerequisites.  Do you want to continue?</h4>
                      <button className="col-md-6 btn btn-danger" onClick={e=>this.handlePrereqEnroll(e,false)}>No</button>
                      <button className="col-md-6 btn btn-primary" onClick={e=>this.handlePrereqEnroll(e,true)}>Yes</button>
                    </div>
                  )
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

export default StudentTerm;