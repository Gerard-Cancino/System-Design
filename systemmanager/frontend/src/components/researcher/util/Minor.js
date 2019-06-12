import React, { Component, PureComponent } from 'react';
import axios from 'axios';

export class ViewMinor extends PureComponent{
  componentWillReceiveProps(props){
    this.forceUpdate()
  }
  render(){    
    return (  
      <div className="col-md-12">
        <h5 className="col-md-12 text-center">Number of Students in Minor</h5>
        {this.props.minorList!=undefined && this.props.minorList.length != 0?(
          <table className="table table-striped">
            <thead>
              <tr><td>Minor ID</td><td>Minor Name</td><td>Number of Students</td></tr>
            </thead>
            <tbody>
              {Object.keys(this.props.minorList).map((key)=>(
                <tr key={this.props.minorList[key].id}>
                  <td>{this.props.minorList[key].minor.id}</td>
                  <td>Minor in {this.props.minorList[key].minor.name}</td>
                  <td>{this.props.minorList[key].amount}</td>
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