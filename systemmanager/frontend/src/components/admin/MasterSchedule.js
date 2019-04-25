import React, { Component } from 'react';

import SearchSection from '../general/Section_Form.js';
import TableSection from './Section_Table.js';

class MasterSchedule extends Component {
  render(){
    return(
      <React.Fragment>
        <SearchSection SectionTable={TableSection} />
      </React.Fragment>
    );
  }
}

export default MasterSchedule;
