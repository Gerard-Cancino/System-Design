import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class CourseDetails extends Component {
  state = {
    course: undefined,
    sectionList:undefined,
    prerequisiteList: undefined,
    result:undefined
  }
  componentDidMount(){
    axios
    .get(`/course-details.json/${this.props.data.state.courseID}`)
    .then(res=>{
      this.setState({course:res.data.data})
    })
    .catch(err=>{
      this.setState({result:err})
    })
    .then(res=>{this.setState({sectionList:res.data.data})})
    axios
    .get('/prerequisite-list.json',{
      params:{
        course:this.props.data.state.courseID
      }
    })
    .then(res=>{
      this.setState({prerequisiteList: res.data.data})
    })
    .catch(err=>{
      this.setState({result:err})
      console.log(err)
    })
  }
  componentWillReceiveProps(props){
    console.log(props.data.state.courseID)
    axios
    .get(`/course-details.json/${props.data.state.courseID}`)
    .then(res=>{
      this.setState({course:res.data.data})
    })
    .catch(err=>{
      this.setState({result:err})
    })
    .then(res=>{this.setState({sectionList:res.data.data})})
    axios
    .get('/prerequisite-list.json',{
      params:{
        course:props.data.state.courseID
      }
    })
    .then(res=>{
      this.setState({prerequisiteList: res.data.data})
    })
    .catch(err=>{
      this.setState({result:err})
      console.log(err)
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        {this.state.course==undefined?(
          <p>The course does not exist</p>
        ):(
          <section className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10 border rounded m-4 p-4">
                <h3><strong>{this.state.course.id} {this.state.course.name}</strong></h3>
                <h4>Description:</h4>
                <p>{this.state.course.description}</p>
                {this.state.prerequisiteList==undefined || this.state.prerequisiteList.length == 0?(
                  <p>The course has no prerequisites.</p>
                ):(
                  <div className="col-md-12">
                    <h5>Prerequisites: </h5>
                    {this.state.prerequisiteList.map(el=>(
                      <Link to={{
                        pathname: '/student/view-course-details',
                        state: {courseID: el.prereq.id}
                      }} className="col-md-3 btn btn-info m-1">{el.prereq.name}</Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
        <Footer />
      </React.Fragment>

    )
  }
}

export default CourseDetails;
