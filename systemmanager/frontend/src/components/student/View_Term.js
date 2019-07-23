import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchTerm from '../general/inputs/Term_List_Search.js';
import TableEnrollment from './Enrollment_Table.js';

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
    status: undefined,
    result:undefined
  }
  componentDidMount() {
    this.setState({studentUsername:this.props.user})
    axios
    .get('/term-list.json')
    .then(res=>{
      this.setState({termList:res.data.data,term:res.data.data[0].id})
      axios
      .get('/enrollment-list.json',{
        params: {
          student: this.props.user,
          term: res.data.data[0].id
        }
      })
      .then(res => {
        this.setState({enrollmentList: res.data.data})
      })
      .catch(err=>{
        this.setState({result:err})
      })
    })
  }
  handleTerm = event => {
    this.setState({term:event.target.value||undefined,enrollmentList:undefined})
    axios
    .get('/enrollment-list.json',{
      params: {
        student: this.props.user,
        term: event.target.value
      }
    })
    .then(res => {
      this.setState({enrollmentList: res.data.data})
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  handleDrop = (event,enrollment,student) => {
    event.preventDefault()
    axios
    .delete(`/enrollment-details.json/${enrollment}/${this.props.user}`)
    .then(res => {
      console.log(res)
      this.setState({result:res})
      axios
      .get('/enrollment-list.json',{
        params: {
          student: this.props.user,
          term: this.state.term
        }
      })
      .then(res => {
        this.setState({enrollmentList: res.data.data})
      })
      .catch(err=>{
        this.setState({result:err})
      })
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  render() {
    return (
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4">
          <div className="col-md-12">
            <Link to={{
                  pathname: '/student/register-enroll'
                }} className="col-md-2 float-right btn btn-info">Enroll Student</Link>
          </div>
            <h2 className="col-md-12 text-center">Search Student's Term</h2>
            <SearchTerm onChange={this.handleTerm} termList={this.state.termList} isRequired={true}/>
            <hr />
            {this.state.enrollmentList==undefined?(
              <p className="col-md-12 text-center">No Enrolled Sections this Term</p>
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