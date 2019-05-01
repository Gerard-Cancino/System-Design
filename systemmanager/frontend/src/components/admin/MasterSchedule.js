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
        <SearchSection SectionTable={TableSection} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default MasterSchedule;
