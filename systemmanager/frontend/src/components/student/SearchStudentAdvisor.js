import React, { Component } from 'react';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class SearchStudentAdvisor extends Component {
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid">
          <div className="row border rounded m-4 p-4">
            <h2>Search Student Advisor</h2>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}


export default SearchStudentAdvisor;
