import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewCourseCatalog extends Component {
  state = {
    termList: [],
    course: [],
    test: [],
  }


  componentWillMount() {
    axios
      .post('slot-list.json')
      .then(res=>{
        this.setState({
          test: res.data,
        })
      })
    axios
      .get('course.json')
      .then(res => {
        this.setState({
          course: res.data,
        })
      })
  }

  render(){
    const Tables = () => (
      this.state.course.length != 0 ? (
        <section className="container-fluid h-100">
          <div className="row border rounded m-4 p-4 h-100">
            <h2 className="col-md-12 text-center">View Course Catalog</h2>
              <table>
                <thead>
                  <tr>
                    <td className='col-md-1'>ID</td>
                    <td className='col-md-3'>Course Name</td>
                    <td className='col-md-7'>Course Description</td>
                    <td className='col-md-1'># of Credits</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.course.map(el => (
                    <tr key={el.number}>
                      <td className='col-md-1'>{el.department_id}{el.number}</td>
                      <td className='col-md-3'>{el.name}</td>
                      <td className='col-md-7'>{el.description}</td>
                      <td className='col-md-1'>{el.numberOfCredits}</td>
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
