import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchTerm from '../general/inputs/Term_List_Search.js';
import SearchStudent from '../general/inputs/Student_Search.js';
import TableEnrollment from '../general/tables/Enrollment_Table.js';

function checkTerm() {
  let today = new Date();
  let year = parseInt(today.getFullYear());
  // Spring november 4 2019 to january 27 2020
  // Fall April 1 to Sept 1
  // Fall + Spring
  let month = parseInt(today.getMonth());
  // Spring
  if((month<7||month>1)){
    let beginTerm = new Date(year+"-01-01");
    let endTerm = new Date(year+"-07-01");
    if(beginTerm<today<endTerm){
      return ({season: 'SP',year:year});
    }
  }
  // Fall
  else if((month>8||month<12)){
    let beginTerm = new Date(year+"-07-02");
    let endTerm = new Date(year+"-12-31");
    if(beginTerm<today<endTerm){
      return ({season: 'F',year:year});
    }
  }
  return undefined;
}

class StudentTerm extends Component{
  state = {
    termList: undefined,
    term: undefined,
    studentUsername: undefined,
    student: undefined,
    enrollmentList: undefined,
    enrollment: undefined,
    status: undefined
  }
  componentDidMount() {
    this.getTerm()
  }
  getTerm = () => {
    let term = checkTerm()
    axios
    .get(`/term-details.json/${term.season}/${term.year}`)
    .then(res=>{
      this.setState({term:res.data})
      console.log(res.data)
    })
  }
  handleStudent = event => {
    this.setState({studentUsername: event.target.value || undefined})
  }
  findStudent = () => {
    axios
    .get('/enrollment-list.json',{
      params: {
        student: this.state.studentUsername,
        term: this.state.term.id
      }
    })
    .then(res => {
      this.setState({enrollmentList: res.data})
    })
  }
  handleFindStudent = event => {
    event.preventDefault();
    this.findStudent();
  }
  handleDrop = (event,enrollment,student) => {
    event.preventDefault()
    axios
    .delete(`/enrollment-details.json/${enrollment}/${student}`)
    .then(res => {
      this.findStudent()
      this.setState({status:res.data})
    })
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
          <div className="col-md-12">
            <Link to={{
                  pathname: '/admin/register-student-enroll'
                }} className="col-md-2 float-right btn btn-info">Enroll Student</Link>
          </div>
            <h2 className="col-md-12 text-center">Search Student's Term</h2>
            <form className="col-md-12" onSubmit={this.handleFindStudent}>
              <SearchStudent onChange={this.handleStudent.bind(this)}/>
              <button className="col-md-12 btn btn-primary" type="submit">Search Term</button>
            </form>
            <hr />
            {this.state.enrollmentList==undefined?(
              <p></p>
            ):(
              <div className="col-md-12">
                <br />
                <TableEnrollment enrollmentList={this.state.enrollmentList} handleDrop={this.handleDrop}/>

              </div>
            )}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default StudentTerm;