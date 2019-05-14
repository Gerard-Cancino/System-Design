import React, { Component } from 'react';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchSection from '../general/forms/Section_Form.js';
import TableSection from './Section_Table.js';

class MasterSchedule extends Component {
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 rounded border p-4 m-4">
              <h2 className="col-md-12 text-center">Master Schedule</h2>
              <SearchSection SectionTable={TableSection} />
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default MasterSchedule;
