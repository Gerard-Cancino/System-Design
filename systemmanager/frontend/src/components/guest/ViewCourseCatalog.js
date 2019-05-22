import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

const Catalog = ({data}) => {
  let currDepart = undefined;
  return(
    data.map(course => (
      <div className="text-center col-md-12">
        {currDepart == course.department.code?(
          <p></p>
        ):(
          <div>
            <h3> Department: {course.department.name}</h3>
            <p style={{display:'none'}}>{currDepart=course.department.code}</p>
          </div>
        )}
        <table className="col-md-12">
          <tbody>
            <tr className="col-md-12">
              <td allign="left">{course.name}</td>
              <td className='col-md-3'>{course.description}</td>
              <td className="col-md-8">{course.numberOfCredits}</td>
              <td className= "col-md-1">{}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ))
  )
}

class ViewCourseCatalog extends Component {
  state = {
    department: undefined,
    course: undefined,
  }
  componentDidMount() {
    axios
      .get('course-list.json')
      .then(res => {
        this.setState({
          course: res.data
      })
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
          <h2 className="col-md-12 text-center">Course Catalog</h2>
            <div className = "col-md-12">
              <table className="col-md-12">
                <thead className="col-md-12">
                  <tr className="col-md-12">
                    <td className='col-md-1'>       Name</td>
                    <td className='col-md-4'>Description</td>
                    <td className='col-md-7'># of Credits</td>
                  </tr>
                </thead>
              </table>
            </div>
            {this.state.course==undefined?(
              <p></p>
            ):(
              this.state.course.length == 0? (
                <p><br></br> Fatal Error, refresh page.</p>
              ):(
                <Catalog data={this.state.course} />
              )
            )}
          </div>

        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewCourseCatalog;