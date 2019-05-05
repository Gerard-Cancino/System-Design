import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

// need to add prereq
class AddPrereq extends Component {
  state = {
    courseID: undefined,
    course: undefined,
    courseList: undefined,
    department: undefined,
  } 

  componentDidMount() {
    this.setState({courseID: this.props.data.state.courseID})
    axios
    .get(`/course-details.json/${this.props.data.state.courseID}`)
    .then(res => (
      this.setState({course: res.data}),
      axios
      .get(`/course-list.json`, {
        params: {
          'department': this.state.course.department.code
        }
      })
      .then(res=>(
        this.setState({courseList: res.data})
      ))
    ));
  }

  handleSubmit = (prereq, event) => {
    console.log('test')
    event.preventDefault();
    axios
    .post(`/prerequisite-list.json`,{
      prerequisite: prereq,
      course: this.state.course.id
    })
    .then(res=>{
      this.setState({course: res.data})
    })
  }
  
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            {!this.state.course?(
              <p></p>
            ):(
              <h2>{this.state.course.id} - {this.state.course.name}</h2>
            )}
            <h3 className="col-md-12">Add Prerequisites</h3>
            {this.state.courseList?(
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
