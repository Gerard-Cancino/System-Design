import React, { Component, PureComponent } from 'react';
import axios from 'axios';

export class ViewStudentCourse extends PureComponent{
  componentWillReceiveProps(props){
    this.forceUpdate()
  }
  render(){    
    return (  
      <div className="col-md-12">
        <h5 className="col-md-12 text-center">Course Section Based on Major</h5>
        {this.props.courseList!=undefined && this.props.courseList.length != 0?(
          <table className="table table-striped">
            <thead>
              <tr><td>Course ID</td><td>Course Name</td><td>Number of Students</td></tr>
            </thead>
            <tbody>
              {Object.keys(this.props.courseList).map((key)=>(
                <tr key={this.props.courseList[key].id}>
                  <td>{this.props.courseList[key].course.id}</td>
                  <td>{this.props.courseList[key].course.name}</td>
                  <td>{this.props.courseList[key].amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ):(
          <p></p>
        )} 
      </div>
    )
  }
}