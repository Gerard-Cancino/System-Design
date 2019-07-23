import React, { Component } from 'react';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class Missing extends Component {
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid h-100">
          <div className="row justify-content-center">
            <div className="col-md-8 border p-4 m-4">
              <h2 className="text-center">404</h2>
              <h4 className="text-center">Could not find page</h4>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Missing;
