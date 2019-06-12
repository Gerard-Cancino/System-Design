import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import {ViewMajor} from './util/Major.js';
import {ViewMinor} from './util/Minor.js';
import {ViewStudentCourse} from './util/Course.js';
import {ViewSlot} from './util/Slot.js';

class Main extends Component {
  state={
    choice:0,
    majorList:undefined,
    major_id:undefined,
    minorList:undefined,
    minorListAmount:undefined,
    minor_id:undefined,
    majorListAmount:undefined,
    slotListAmount:undefined,

    termList:undefined,
    term_id:undefined,
    courseListAmount:undefined,
  }
  componentDidMount(){    
    axios 
    .get('/minor-list.json')
    .then(res=>{this.setState({minorList:res.data.data})})
    axios
    .get('/term-list.json')
    .then(res=>{
      this.setState({termList:res.data.data,term_id:res.data.data[0].id})
      axios
      .get('/popular.json',{params:{student_major_number:true,term_id:res.data.data[0].id}})
      .then(res=>{this.setState({majorListAmount:res.data.data})})   
      axios 
      .get('/major-list.json')
      .then(major_list=>{
        this.setState({majorList:major_list.data.data,major_id:major_list.data.data[0].id})
        axios
        .get('/popular.json',{params:{student_course_number:true,major_id:major_list.data.data[0].id,term_id:res.data.data[0].id}})
        .then(res=>{
          this.setState({courseListAmount:res.data.data})
        })
      })
      axios
      .get('/popular.json',{params:{student_slot_number:true},term_id:res.data.data[0].id})
      .then(res=>{this.setState({slotListAmount:res.data.data})
      })
    })
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    let inputState = {};
    inputState[name]=value;
    this.setState(inputState)
  }
  handleTerm = e =>{
    this.setState({term_id:e.target.value})
    if(this.state.choice==0){
      axios
      .get('/popular.json',{params:{student_major_number:true,term_id:e.target.value}})
      .then(res=>{this.setState({majorListAmount:res.data.data})})
    }
    else if (this.state.choice==1){
      axios
      .get('/popular.json',{params:{student_course_number:true,term_id:e.target.value,major_id:this.state.major_id}})
      .then(res=>{this.setState({courseListAmount:res.data.data})})
    }
    else if (this.state.choice==2){      
      axios
      .get('/popular.json',{params:{student_minor_number:true,term_id:e.target.value}})
      .then(res=>{this.setState({minorListAmount:res.data.data})})
    }
    else if (this.state.choice==3){
      axios
      .get('/popular.json',{params:{student_slot_number:true,term_id:e.target.value}})
      .then(res=>{this.setState({slotListAmount:res.data.data})
      })
    }
  }
  handleChoice = e =>{
    this.setState({'choice':e.target.value})
    if(e.target.value==0){
      axios
      .get('/popular.json',{params:{student_major_number:true,term_id:this.state.term_id}})
      .then(res=>{this.setState({majorListAmount:res.data.data})})
    }
    else if (e.target.value==1){
      axios
      .get('/popular.json',{params:{student_course_number:true,term_id:this.state.term_id,major_id:this.state.major_id}})
      .then(res=>{this.setState({courseListAmount:res.data.data})})
    }
    else if(e.target.value==2){
      axios
      .get('/popular.json',{params:{student_minor_number:true,term_id:this.state.term_id}})
      .then(res=>{this.setState({minorListAmount:res.data.data})})
    }
    else if (e.target.value==3){
      axios
      .get('/popular.json',{params:{student_slot_number:true,term_id:this.state.term_id}})
      .then(res=>{this.setState({slotListAmount:res.data.data})
      })
    }
  }
  handleMajor = e => {
    this.setState({'major_id':e.target.value})
    axios
    .get('/popular.json',{params:{student_course_number:true,term_id:this.state.term_id,major_id:e.target.value}})
    .then(res=>{console.log(res.data.data);this.setState({courseListAmount:res.data.data})})
  }
  render(){
    return(
      <React.Fragment>
        <Header username={this.props.user}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded p-4 m-4">
              <h2 className="col-md-12 text-center">Research Data</h2>
              <br/>
              {this.state.termList==undefined?(
                <p></p>
              ):(
                <select className="form-control" onChange={this.handleTerm}>
                  {this.state.termList.map(el=>(
                    <option key={el.id} value={el.id}>{el.season} {el.year}</option>
                  ))}
                </select>
              )}
              <br />
              <select className="form-control" onChange={this.handleChoice}>
                <option value={0}>Number of Students Enrolled in Majors</option>
                <option value={1}>Number of Students in Course based on Major</option>
                <option value={2}>Number of Students Enrolled in Minors</option>
                <option value={3}>Number of Courses in Time Slot</option>
              </select>
              <br/>
              {this.state.choice!=0 || this.state.majorListAmount==undefined?(
                <p></p>
              ):(
                <ViewMajor majorList={this.state.majorListAmount}/>
              )}
              {this.state.choice!=1?(
                <p></p>
              ):(
                <div>
                  <select className="form-control" onChange={this.handleMajor}>
                    {this.state.majorList.map(el=>(
                      <option key={el.id} value={el.id}>{el.type} in {el.name}</option>
                    ))}
                  </select>
                  {this.state.majorList == undefined?(
                    <p></p>
                  ):(
                    this.state.courseListAmount == undefined?(
                      <p></p>
                    ):(
                      <ViewStudentCourse courseList={this.state.courseListAmount} />
                    )
                  )}
                </div> 
              )}
              {this.state.choice!=2?(
                <p></p>
              ):(
                <ViewMinor minorList={this.state.minorListAmount}/>
              )}
              {this.state.choice!=3?(
                <p></p>
              ):(
                this.state.slotListAmount==undefined?(
                  <p></p>
                ):(
                  <ViewSlot slotList={this.state.slotListAmount} />
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

export default Main;
