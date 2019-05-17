import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

const Catalog = ({data}) => {
  let currDepart = undefined;
  return(
    data.map(course => (
      <div className="text-center col-md-12">
        <div>
          <h3>{course.department.name}</h3>
          <p style={{display:'none'}}>{currDepart=course.department.code}</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <td scope="col">Name</td>
              <td scope="col">Description</td>
              <td scope="col">Credit</td>
            </tr>
          </thead>

          <tbody>
        {currDepart == course.department.code?(
          <tr>
            <td>{course.name}</td>
            <td>{course.description}</td>
            <td>{course.numberOfCredits}</td>
          </tr>
        ):(
          <tr>
            <td>{course.name}</td>
            <td>{course.description}</td>
            <td>{course.numberOfCredits}</td>
          </tr>
        )}

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
            {this.state.course==undefined?(
              <p></p>
            ):(
              <Catalog data={this.state.course} />
            )}
          </div>

        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewCourseCatalog;
