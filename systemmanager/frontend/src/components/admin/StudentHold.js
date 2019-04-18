import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class AddStudentHold extends Component {
  state = {
    studentUsername: '',
    holdSelected: '',
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
      .post(`/student-details.json/${this.state.studentUsername}`, {
        data: this.state.holdSelected
      })
      .then(res => {
        this.setState({
          isSuccessful: res.data.isSuccessful,
          isLoaded: true
        })
      })

  }

  render(){
    const Info = () =>
      !this.state.hold.length?(
        <p>No Holds in system or Could not connect to server to get holds</p>
      ) : (
        <div>
          <p><strong>Select a Hold</strong></p>
          <select onChange={this.handleChange1} value={this.state.holdSelected}>
            {this.state.hold.map(singleHold => (
              <option key={singleHold.name} value={singleHold.name} selected>{singleHold.name}: {singleHold.description}</option>
            ))}
          </select>
        </div>
      );
    const Success = () =>
      !this.state.isLoaded?(
        <p></p>
      ) : (
        !this.state.isSuccessful?(
          <p>Failed! Hold was not added</p>
        ) : (
          <p>Success! Hold was added</p>
        )
      )
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">Add Student Hold</h2>
            <form className="col-md-12" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentUsername"></label>
                <input type="text" className="form-control" id="studentUsername" placeholder="Enter Student's Username" onChange={this.handleChange}/>
                <br />
                <Info/>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button> 
              </div>
            </form>
            <Success />
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}



export default AddStudentHold;
