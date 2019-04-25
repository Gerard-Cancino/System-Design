import React,{Component} from 'react'
import axios from 'axios'

import Header from './layout/Header.js'
import Footer from './layout/Footer.js'

import SearchTerm from '../general/Term_Search.js';
import SearchStudent from '../general/Student_Search.js';
import TableEnrollment from '../general/Enrollment_Table.js';

class StudentTerm extends Component{
  state = {
    termList: undefined,
    term: undefined,
    studentUsername: undefined,
    student: undefined,
    enrollmentList: undefined,
    enrollment: undefined
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
    this.setState({term: event.target.value});
  }
  handleStudent = event => {
    this.setState({studentUsername: event.target.value})
  }
  findStudent = event => {
    event.preventDefault()
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
  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">Search Student's Term</h2>
            <form className="col-md-12" onSubmit={this.findStudent}>
              <SearchTerm onChange={this.handleTerm.bind(this)} termList={this.state.termList}/>
              <SearchStudent onChange={this.handleStudent.bind(this)}/>
              <button className="btn" type="submit">Search Term</button>
            </form>
            <TableEnrollment enrollmentList={this.state.enrollmentList}/>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default StudentTerm;