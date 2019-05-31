import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

// need to add prereq
class AddPrereq extends Component {
  state = {
    courseID: undefined,
    course: undefined,
    courseList: undefined,
    department: undefined,
    prerequisiteList: undefined,
    result: undefined
  } 
  getCoursePrereqList(){
    axios
    .get(`/course-details.json/${this.props.data.state.courseID}`)
    .then(res => {
      this.setState({course: res.data.data}),
      axios
      .get(`/course-list.json`, {
        params: {
          'department': this.state.course.department.code
        }
      })
      .then(res=>{
        this.setState({courseList: res.data.data})
        axios
        .get('/prerequisite-list.json',{
          params: {
            'course': this.state.course.id
          }})
        .then(res=>{
          this.setState({prerequisiteList: res.data.data})
          let courseList = this.state.courseList;
          let prerequisiteList = res.data.data;
          for(let i = 0;i<courseList.length;i++){              
            if(this.state.courseID==courseList[i].id){
              courseList.splice(i,1)
            }
          }
          for(let i = 0;i<prerequisiteList.length;i++){  
            for(let j = 0;j<courseList.length;j++){
              if(prerequisiteList[i].prereq.id==courseList[j].id){
                courseList.splice(j,1)
                break;
              }
            }
          }
          this.setState({courseList:courseList})
        })
      })
    })
  }
  componentDidMount() {
    this.setState({courseID: this.props.data.state.courseID})
    this.getCoursePrereqList()
  }


  handleSubmit = (prereq, event) => {
    event.preventDefault();
    axios
    .post(`/prerequisite-list.json`,{
      prerequisite: prereq,
      course: this.state.course.id
    })
    .then(res=>{
      this.setState({result:res})
      this.getCoursePrereqList()
    })
  }
  handleRemove = (prereq, event) => {
    event.preventDefault();
    axios
    .delete(`/prerequisite-details.json/${prereq}`)
    .then(res =>{
      this.setState({result:res})
      this.getCoursePrereqList()
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <div className="col-md-12">
              <Link to={{
                pathname: '/admin/view-course-list'
              }} className="col-md-2 btn btn-success float-right">Back to Course List</Link>
            </div>
            {!this.state.course?(
              <p></p>
            ):(
              <h2>{this.state.course.id} - {this.state.course.name}</h2>
            )}
            <h3 className="col-md-12">Add Prerequisites</h3>
            {this.state.prerequisiteList?(
              <table className="col-md-12">
                <thead className="col-md-12">
                  <tr className="col-md-12">
                    <td className="col-md-1">Course ID</td>
                    <td className="col-md-3">Course Name</td>
                    <td className="col-md-6">Description</td>
                    <td className="col-md-1">Credits</td>
                    <td className="col-md-1"></td>
                  </tr>
                </thead>
                <tbody className="col-md-12">
                  {this.state.prerequisiteList.map(el=>(
                    <tr className="col-md-12" key={el.id}>
                      <td className="col-md-1">{el.prereq.id}</td>
                      <td className="col-md-3">{el.prereq.name}</td>
                      <td className="col-md-6">{el.prereq.description}</td>
                      <td className="col-md-1">{el.prereq.numberOfCredits}</td>
                      <td className="col-md-1">
                        <button className="btn btn-danger" type="submit" onClick={e=>(this.handleRemove(el.id,e))}>Remove</button>
                      </td>
                    </tr>
                  ))}
                  {this.state.courseList.map(el=>(
                    <tr className="col-md-12" key={el.id}>
                      <td className="col-md-1">{el.id}</td>
                      <td className="col-md-3">{el.name}</td>
                      <td className="col-md-6">{el.description}</td>
                      <td className="col-md-1">{el.numberOfCredits}</td>
                      <td className="col-md-1">
                        <button className="btn btn-info" type="submit" onClick={e=>(this.handleSubmit(el.id,e))}>Add</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ):(
              <p></p>
            )}

          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}


export default AddPrereq;
