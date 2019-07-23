import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

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
      endTerm = new Date(year,'09','01');
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

class AssignGrade extends Component {
  state = {
    termList: undefined,
    term: undefined,
    enrollment: undefined,
    grade:undefined,
    letterGrade: 'A',
    result:undefined,
    courseSection:undefined,
  }
  componentDidMount() {
    axios
    .get(`/course-section-details.json/${this.props.data.state.courseSectionID}`)
    .then(res=>{
      this.setState({courseSection:res.data.data})
    })
    .catch(err=>{this.setState({result:err})})
  }
  handleLetterGrade = e => {
    this.setState({letterGrade:e.target.value || undefined})
  }
  changeGrade = (e,type) => {
    e.preventDefault()
    axios
    .post(`/grade-list.json`,{
      student_email:this.props.data.state.studentEmail,
      course_section_id:this.props.data.state.courseSectionID,
      letterGrade:this.state.letterGrade,
      type:type
    })
    .then(res=>{
      this.setState({result:res})
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
              <h2 className="col-md-12 text-center">Assign Student's Grade</h2>
                {this.state.courseSection==undefined?(
                  <p>Unavailable to assign grades at this time.</p>
                ):(checkAddDrop(this.state.courseSection.term)=='M'?(
                  <form onSubmit={(e) => this.changeGrade(e,'M')} className="col-md-12">
                    <div className="form-group">
                      <label>Assign Midterm Grade</label>
                      <select className="form-control" onChange={this.handleLetterGrade}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                      <button className="col-md-12 btn btn-primary" type="submit">Submit</button>
                    </div>
                  </form>
                ):(
                  checkAddDrop(this.state.courseSection.term)=='F'?(
                    <form onSubmit={(e) => this.changeGrade(e,'F')}>
                      <div className="form-group">
                        <label>Assign Final Grade</label>
                        <select className="form-control" onChange={this.handleLetterGrade}>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                        </select>    
                      </div>
                      <button className="col-md-12 btn btn-primary" type="submit">Submit</button>
                    </form>
                  ):(
                    <p></p>
                  )
                ))}
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default AssignGrade;