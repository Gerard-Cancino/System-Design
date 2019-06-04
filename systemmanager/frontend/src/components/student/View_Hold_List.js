import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class StudentHold extends Component {
  state = {
    student: undefined,
    result: undefined
  }
  componentWillMount(){
    this.getHoldList()
  }
  getHoldList = () => {
    axios
    .get(`/student-details.json/${this.props.user}`)
    .then(res => {
      this.setState({
        student: res.data.data,
        result: undefined
      })
    })
    .catch(err=>{
      this.setState({result:err})
    })
    this.setState({isLoaded: true})
  }
  render(){
    const FindStudent = () => 
      this.state.student != undefined?(
        <div className="col-md-12">
          <h4 className="col-md-12 text-center">{this.state.student.user.firstName} {this.state.student.user.lastName}</h4>
          {this.state.student.hold.length != 0?(
            <table className="table table-striped">
              <thead style={{backgroundColor:"#696969", color:"white"}}>
                <tr >
                  <td >Name</td>
                  <td >Type</td>
                  <td >Description</td>
                </tr>
              </thead>
              <tbody>
                {this.state.student.hold.map(el => (
                  <tr key={el.name}>
                    <td>{el.name}</td>
                    <td>{el.type}</td>
                    <td>{el.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ):(
            <p>Student has no holds</p>
          )}
        </div>
      ):(
        <p></p>
      )
    

    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">Student Hold</h2>
            <FindStudent />
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}



export default StudentHold;
