import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchStudent from '../general/inputs/Student_Search.js';
import TableGrade from '../general/tables/Update_Grade_Table.js';

function checkAddDrop(term) {
  let today = new Date();
  let year = parseInt(today.getFullYear());
  if (term.year==year||term.year==year-1){
    if(term.season=="Spring"){
      let beginTerm = new Date(year,'01','01');
      let endTerm = new Date(year,'03','01');
      if(beginTerm<today && today<endTerm){
        return 'M';
      }
      beginTerm = new Date(year,'04','01');
      endTerm = new Date(year,'09','01');
      if(beginTerm<today && today<endTerm){
        return 'F'; 
      }
    }
    else if(term.season=="Fall"){
      let beginTerm = new Date(year,'09','01');
      let endTerm = new Date(year,'11','01');
      if(beginTerm<today && today<endTerm){
        return 'M';
      }
      beginTerm = new Date(year,'12','01');
      endTerm = new Date((year+1),'02','01');
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
    gradeList:undefined,
    letterGrade: 'A',
    result:undefined,
    gradeType:undefined
  }
  componentDidMount() {
    this.setState({studentUsername:this.props.data.state.student_username});
    axios
    .get('/term-list.json')
    .then(res=>{
      this.setState({term:res.data.data[res.data.data.length-2]})
      this.setState({gradeType:checkAddDrop(res.data.data[res.data.data.length-2])})
    });
    this.findGradeList();
  }
  findGradeList = () => {
    axios
    .get(`/grade-list.json`,{
      params:{
        student_email:this.props.data.state.student_username,
        course_section_id:this.props.data.state.course_section_id
      }
    })
    .then(res=>{
      this.setState({gradeList:res.data.data})

    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  handleLetterGrade = e => {
    this.setState({letterGrade:e.target.value || undefined})
  }
  changeGrade = (e,type,id) => {
    e.preventDefault()
    axios
    .put(`/grade-details.json/${id}`,{
      'grade':this.state.letterGrade,
      'type': type
    })
    .then(res=>{
      this.setState({result:res})
      this.props.history.push({
        pathname: '/faculty/view-student-info',
        state:{
          courseSectionID:this.props.data.state.course_section_id,
          studentEmail:this.props.data.state.student_username}
        })
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  getGrade = () => {
    let selectedGrade = undefined;
    try{
      if (this.state.gradeType=='F') {
        for (let el of this.state.gradeList){
          if (el.type=='F'){
            selectedGrade = el;
          }
        }
        return(
          <form onSubmit={(e) => {this.changeGrade(e,'F',selectedGrade.id)}} className="col-md-12">
            <div className="form-group">
              <label>Edit Final Grade</label>
              <select className="form-control" onChange={this.handleLetterGrade}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
              {this.state.grade==undefined?(
                <p className="text-secondary">Current Grade: {selectedGrade.letterGrade}</p>
              ):(
                <p className="text-secondary">Current Grade: {this.state.grade.letterGrade}</p>
              )}
              <button className="col-md-12 btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        )
      }
      else if (this.state.gradeType=='M') {
        for (let el of this.state.gradeList){
          if (el.type=='M'){
            selectedGrade = el;
          }
        }
        return(
          <form onSubmit={(e) => {this.changeGrade(e,'M',selectedGrade.id)}} className="col-md-12">
            <div className="form-group">
              <label>Edit Midterm Grade</label>
              <select className="form-control" onChange={this.handleLetterGrade}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
              {this.state.grade==undefined?(
                <p className="text-secondary">Current Grade: {selectedGrade.letterGrade}</p>
              ):(
                <p className="text-secondary">Current Grade: {this.state.grade.letterGrade}</p>
              )}
              <button className="col-md-12 btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        )
      }
      else{
        return(
          <p className="col-md-12 text-center">Cannot update a grade at this time</p>
        )
      }
    }
    catch{
      return(
        <p className="col-md-12 text-center">There exist no {this.state.gradeType=='F'?("Final"):("Midterm")} grade. Please contact the teacher to assign a grade.</p>
      )
    }
  }
  resetGradeList = () => {
    this.setState({gradeList:undefined})
  }
  render() {
    return (
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4">
            <div className="col-md-12">
              <h2 className="col-md-12 text-center">Update Student's Grade</h2>
              {this.state.gradeType==undefined?(
                <p></p>
              ):(
                <h4 className="col-md-12 text-center">{this.state.gradeType=='F'?("Final"):("Midterm")} Grades were automatically selected based on today's date</h4>
              )}
              {this.state.gradeList==undefined?(     
                <div className="col-md-12">
                  <p className="col-md-12 text-center">Loading...</p>
                </div>
              ):(
                <div>
                  {this.state.gradeList.length == 0?(
                    <p className="col-md-12 text-center">The student does not any grades assigned.  Please contact the faculty to create a grade </p>
                  ):(
                    this.getGrade() 
                  )}
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

export default UpdateStudentGrade;