import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchTerm from '../general/inputs/Term_List_Search.js';
import SearchStudent from '../general/inputs/Student_Search.js';
import TableEnrollment from '../general/tables/Enrollment_Table.js';



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
    axios
    .get('/term-list.json')
    .then(res => {
      this.setState({
        termList: res.data,
        term: res.data[0].id
      })
    })
  }
  handleTerm = event => {
    this.setState({term: event.target.value || undefined});
  }
  handleStudent = event => {
    this.setState({studentUsername: event.target.value || undefined})
  }
  findStudent = () => {
    axios
    .get('/enrollment-list.json',{
      params: {
        student: this.state.studentUsername,
        term: this.state.term
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
              {this.state.termList==undefined?(
                <p></p>
              ):(
                <div className="form-group col-md-12">
                  <label>Term:</label>
                  <select id="term" className="form-control" onChange={this.handleTerm}>
                    {this.state.termList.map(single => (
                      <option key={single.id} value={single.id}>{single.season}: {single.year}</option>
                    ))}
                  </select>
                </div>  
              )}
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