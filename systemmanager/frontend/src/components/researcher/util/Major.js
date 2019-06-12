import React, { Component, PureComponent } from 'react';
import axios from 'axios';

export class ViewMajor extends PureComponent{
  componentWillReceiveProps(props){
    this.forceUpdate()
  }
  render(){    
    return (  
      <div className="col-md-12">
        <h5 className="col-md-12 text-center">Number of Students in Major</h5>
        {this.props.majorList!=undefined && this.props.majorList.length != 0?(
          <table className="table table-striped">
            <thead>
              <tr><td>Major ID</td><td>Major Name</td><td>Number of Students</td></tr>
            </thead>
            <tbody>
              {Object.keys(this.props.majorList).map((key)=>(
                <tr key={this.props.majorList[key].id}>
                  <td>{this.props.majorList[key].major.id}</td>
                  <td>{this.props.majorList[key].major.type} in {this.props.majorList[key].major.name}</td>
                  <td>{this.props.majorList[key].length}</td>
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