import React, { Component } from 'react';
import PropTypes from "prop-types";

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class DeclareStudentMajorMinor extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };
  state = {
    studentID: "",
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { studentID } = this.state;
    const student = { studentID };
    const conf = {
      method: "post",
      body: JSON.stringify(student),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(this.props.endpoint, conf).then(response => console.log(response));
  };

  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid">
          <div className="row border rounded m-4 p-4">
            <h2>Declare Student's Major or Minor</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="studentID"></label>
                <input type="id" class="form-control" id="studentID" placeholder="Enter Student's ID" />
              </div>
              <div className="form-group">
                <label for="declare"></label>
                  {data.map(el => (
                    <select multiple className="form-control" id="declare">
                    {Object.entries(el).map(el =>
                      <option>{el[1]}</option>
                    )}
                    </select>
                  ))}
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}


export default DeclareStudentMajorMinor;
