import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class StudentHold extends Component {
  state = {
    studentUsername: '',
    holdSelected: '',
    holdDeleted: '',
    student: '',
    hold: [],
    isSuccessful: false,
    isLoaded: false
  }
  componentWillMount(){
    axios
      .get('/hold-list.json')
      .then(res => {
        this.setState({
          hold: res.data,
          holdSelected: res.data[0].name
        })
      })
  }
  handleChange = event => {   
    this.setState({ studentUsername: event.target.value });
  }
  handleChange1 = event => {    
    this.setState({ holdSelected: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .get(`/student-details.json/${this.state.studentUsername}`)
      .then(res => {
        this.setState({
          student: res.data
        })
      })
    this.setState({isLoaded: true})
  }

  handleDelete = (event,hold) => {
    event.preventDefault();
    console.log(hold)
    axios
      .put(`/student-details.json/${this.state.studentUsername}`, 
        {holdDelete: hold}
      )
      .then(res => {
        this.setState({
          student: res.data
        })
      })
  }
  handleAdd = event => {
    event.preventDefault();
    console.log(this.state.holdSelected)
    axios
      .put(`/student-details.json/${this.state.studentUsername}`, 
        {holdAdd: this.state.holdSelected}
      )
      .then(res => {
        this.setState({
          student: res.data
        })
      })
  }
  render(){
    const FindStudent = () => 
      this.state.student != ''?(
        <div className="col-md-12">
          <hr />
          <form className="col-md-12" onSubmit={this.handleAdd} >
            <select value={this.state.holdSelected} className="d-inline form-control col-md-8" onChange={this.handleChange1}>
              {this.state.hold.map(el => (
                <option key={el.name} value={el.name}>{el.description}</option>
              ))}
            </select>
            <button type="submit" className="d-inline btn btn-primary col-md-4">Add</button>
          </form>
          <hr />
          <p>{this.state.student.user.firstName} {this.state.student.user.lastName}</p>
          {this.state.student.hold.length != 0?(
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className="col-md-2">Name</td>
                  <td className="col-md-2">Type</td>
                  <td className="col-md-6">Description</td>
                  <td className="col-md-2"></td>
                </tr>
              </thead>
              <tbody className="col-md-12">
                {this.state.student.hold.map(el => (
                  <tr style={{border:'1px 0 0 0 grey',}}className="col-md-12" key={el.name}>
                    <td className="col-md-2" >{el.name}</td>
                    <td className="col-md-2">{el.type}</td>
                    <td className="col-md-6">{el.description}</td>
                    <td className="col-md-2">
                      <button onClick={(e) => this.handleDelete(e,el.name)} className="col-md-12 btn btn-danger">Remove</button>
                    </td>
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
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">Student Hold</h2>
            <form className="col-md-12" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentUsername"></label>
                <input type="text" className="form-control" id="studentUsername" placeholder="Enter Student's Username" onChange={this.handleChange}/>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button> 
              </div>
            </form>
            <FindStudent />
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}



export default StudentHold;
