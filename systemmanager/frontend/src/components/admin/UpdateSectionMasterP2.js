import React, { Component } from 'react';
import axios from 'axios';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchFacultyList from '../general/Faculty_List_Search.js'
import SearchTerm from '../general/Term_Search.js';
import SearchTime from '../general/Time_Search.js';
import SearchDay from '../general/Day_Search.js';


// View Course Catalog -> Add (Button) -> Fill out Required 
// -> (optional inputs) -> submit -> return json of for course id to master
class UpdateSectionMaster extends Component {
  state = {
    id: undefined,
    section: undefined,
    faculty: undefined,
    facultyList: undefined,
  }
  componentDidMount(){
    this.setState({'id': this.props.data.state.id})
    axios
    .get(`/course-section-details.json/${this.props.data.state.id}`)
    .then(res => {
      this.setState({'section': res.data})
      this.setState({'faculty': res.data.faculty.user.id})
      axios
      .get('/faculty-list.json', {
        params: {
          'department': this.state.section.course.department.code
        }
      })
      .then( res => {
        this.setState({
          'facultyList': res.data,
        })
      })
    })
  }
  handleFaculty = event => {   
    this.setState({ faculty: event.target.value });
  }

  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
            {this.state.section==undefined?(
              <p></p>
            ) : (
              <div className="row border rounded m-4 p-4 h-100">
                <h2 className="col-md-12 text-center">Update Section to Master</h2>
                <form className="col-md-12" onSubmit={this.handleSubmit}>
                  {this.state.section.course == null?(
                    <p></p>
                  ) : (
                    <h4>{this.state.section.course.name} - Section: {this.state.section.number}</h4>
                  )}
                  <label>Number of Seats:</label>
                  <input placeholder={this.state.section.numOfSeats}></input>
                  <p className="text-secondary">Number of Seats Currently Taken: {this.state.section.numOfTaken}</p>
                  <label>Faculty's Name:</label>
                  {/*list of all faculty*/}
                  <SearchFacultyList onChange={this.handleFaculty} facultyList={this.state.facultyList} />
                  <button className="btn btn-primary">Submit</button>
                </form>
              </div>
            )}
        </section>
        <Footer />
      </React.Fragment>
      
    );
  }
}



export default UpdateSectionMaster;
