import React, { Component } from 'react';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewCourseList extends Component {
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid">
          <div className="row border rounded m-4 p-4">
            <h2>Course List </h2>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

const Table = ({data}) =>
  !data.length ? (
    <p>You are not facilitating any courses.  If this is wrong, please contact the admin</p>
  ) : (
    <div>
      {data.map(el => (
        <div>
          <h5>Course #</h5>
          {Object.entries(el).map(el =>
            <div>
              <p>Course Title - Course Number </p>  
              <p>Course Time</p>
              <p>Course Location</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

export default ViewCourseList;
