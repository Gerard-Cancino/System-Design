import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'; 

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewCourseCatalog extends Component {
  state = {
    course: undefined,
    status: undefined
  }

  getCourseList(){
    axios
    .get('/course-list.json')
    .then(res => {
      this.setState({
        course: res.data,
      })
    })
  }
  componentWillMount() {
    this.getCourseList()
  }

  handleRemove = (e,course) => {
    e.preventDefault()
    axios
    .delete(`/course-details.json/${course}`)
    .then(res=>{
      this.setState({
        status:res.data
      })
      this.getCourseList()
    })
  }
  render(){
    const Tables = () => (
      this.state.course != undefined && this.state.course.length != 0? (
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">View Course Catalog</h2>
              <table>
                <thead>
                  <tr>
                    <td className='col-md-1'>ID</td>
                    <td className='col-md-3'>Course Name</td>
                    <td className='col-md-4'>Course Description</td>
                    <td className='col-md-1'># of Credits</td>
                    <td className='col-md-1'></td>
                    <td className='col-md-1'></td>
                    <td className='col-md-1'></td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.course.map(el => (
                    <tr key={el.id}>
                      <td className='col-md-1'>{el.id}</td>
                      <td className='col-md-3'>{el.name}</td>
                      <td className='col-md-4'>{el.description}</td>
                      <td className='col-md-1'>{el.numberOfCredits}</td>
                      <td className='col-md-1'>
                        <Link to={{
                          pathname: '/admin/create-section',
                          state: {courseID: el.id}
                        }} className="btn btn-success">Create Section</Link>
                      </td>
                      <td className='col-md-1'>
                        <Link to={{
                          pathname: '/admin/update-course',
                          state: {courseID: el.id}
                        }} className="btn btn-info">Update</Link>
                      </td>
                      <td className='col-md-1'>
                        <button className="btn btn-danger" onClick={e=>this.handleRemove(e,el.id)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

      ) : (
        this.state.isLoaded?(
          <p>Cannot find any courses. This is an error. Please let admin know.</p>
        ) : (
          <p></p>
        )
      )
    )
    console.log("reloading page");
    return(
      <React.Fragment>
        <Header />
        <Tables />
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewCourseCatalog;
