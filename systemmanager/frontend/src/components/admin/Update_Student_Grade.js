import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchStudent from '../general/inputs/Student_Search.js';
import TableGrade from '../general/tables/Update_Grade_Table.js';

function checkAddDrop(term) {
  let today = new Date();
  console.log(today)
  let year = parseInt(today.getFullYear());
  if (term.year==year||term.year==year-1){
    if(term.season=="SP"){
      console.log("spring")
      let beginTerm = new Date(year,'01','01');
      console.log(beginTerm)
      let endTerm = new Date(year,'02','01');
      if(beginTerm<today && today<endTerm){
        return 'M';
      }
      beginTerm = new Date(year,'04','01');
      endTerm = new Date(year,'06','01');
      console.log(beginTerm)
      console.log(endTerm)
      if(beginTerm<today && today<endTerm){
        return 'F'; 
      }
    }
    else if(term.season=="F"){
      console.log("fall")
      let beginTerm = new Date(year,'09','01');
      let endTerm = new Date(year,'10','01');
      if(beginTerm<today && today<endTerm){
        return 'M';
      }
      beginTerm = new Date(year,'12','01');
      endTerm = new Date((year+1),'01','01');
      if(beginTerm<today && today<endTerm){
        return 'F';
      }
    }
  }
  return undefined;
}

class UpdateStudentGrade extends Component {
  state = {
    termList: undefined,
    term: undefined,
    studentUsername: undefined,
    enrollmentList: undefined,
    enrollment: undefined,
    grade:undefined,
    letterGrade: 'A',
    result:undefined
  }
  componentDidMount() {
    axios
    .get('/term-list.json')
    .then(res=>{
      this.setState({term:res.data.data,term:res.data.data[res.data.data.length-2]})
    })
  }
  handleTerm = event => {
    this.setState({term:event.target.value || undefined})
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
      this.setState({enrollmentList: res.data.data,result:undefined})
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  handleFindStudent = event => {
    event.preventDefault();
    this.findStudent();
  }
  handleGrade = e => {
    console.log(e.target.value)
    axios
    .get(`/grade-details.json/${this.state.studentUsername}/${e.target.value}`)
    .then(res=>{
      this.setState({grade:res.data.data,result:undefined})
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  handleLetterGrade = e => {
    this.setState({letterGrade:e.target.value || undefined})
  }
  changeGrade = (e,type) => {
    e.preventDefault()
    axios
    .put(`/grade-details.json/${this.state.studentUsername}/${this.state.grade.course_section.id}`,{
      'grade':this.state.letterGrade,
      'type': type
    })
    .then(res=>{
      this.setState({result:res})
      axios
      .get(`/grade-details.json/${this.state.studentUsername}/${this.state.grade.course_section.id}`)
      .then(res=>{
        this.setState({grade:res.data.data,result:undefined})
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
          <div className="row border rounded m-4 p-4 h-100">
            <div className="col-md-12">
              <h2 className="col-md-12 text-center">Update Student's Grade</h2>
              {this.state.enrollmentList==undefined?(              
                <form className="col-md-12" onSubmit={this.handleFindStudent}>
                  {this.state.term==undefined?(
                    <p>Loading current term</p>
                  ):(
                    <div className="form-group col-md-12">
                      <label>Term</label>
                      <input className="form-control" placeholder={this.state.term.season +" "+ this.state.term.year} disabled />
                    </div>
                  )}
                  <SearchStudent onChange={this.handleStudent.bind(this)} isRequired={true}/>
                  <button className="col-md-12 btn btn-primary" type="submit">Search Term</button>
                </form>
              ):(
                this.state.grade==undefined?(     
                <div className="col-md-12">
                  <br />
                  <TableGrade enrollmentList={this.state.enrollmentList} handleGrade={this.handleGrade.bind(this)}/>
                </div>
                ):(
                  checkAddDrop(this.state.grade.course_section.term)=='M'?(
                    <form onSubmit={(e) => this.changeGrade(e,'M')} className="col-md-12">
                      <div className="form-group">
                        <label>Edit Midterm Grade</label>
                        <select className="form-control" onChange={this.handleLetterGrade}>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                        </select>
                        <p className="text-secondary">Current Grade: {this.state.grade.letterGrade}</p>
                        <button className="col-md-12 btn btn-primary" type="submit">Submit</button>
                      </div>
                    </form>
                  ):(
                    checkAddDrop(this.state.grade.course_section.term)=='F'?(
                      <form onSubmit={(e) => this.changeGrade(e,'F')}>
                        <div className="form-group">
                          <label>Edit Final Grade</label>
                          <select className="form-control" onChange={this.handleLetterGrade}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                          </select>    
                          <p className="text-secondary">Current Grade: {this.state.grade.letterGrade}</p>   
                        </div>
                        <button className="col-md-12 btn btn-primary" type="submit">Submit</button>
                      </form>
                    ):(
                      <p></p>
                    )
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

export default UpdateStudentGrade;