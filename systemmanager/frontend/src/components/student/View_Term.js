import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchTerm from '../general/inputs/Term_List_Search.js';
import TableEnrollment from './Enrollment_Table.js';

class StudentTerm extends Component{
  state = {
    termList: undefined,
    term: undefined,
    studentUsername: undefined,
    student: undefined,
    enrollmentList: undefined,
    enrollment: undefined,
    status: undefined,
    result:undefined,
    isLoading: false,
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
    this.setState({isLoading:true})
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

      this.setState({isLoading:false})
    })
    .catch(err=>{
      this.setState({result:err,isLoading:false})
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
              this.state.isLoading==true?(
                <p>Please wait while we process the drop</p>
              ):(
                <div className="col-md-12">
                  <br />
                  <TableEnrollment enrollmentList={this.state.enrollmentList} handleDrop={this.handleDrop}/>
                </div>
              )
            )}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default StudentTerm;