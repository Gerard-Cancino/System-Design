import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewCourseCatalog extends Component {
  state = {
    major: undefined
  }


  componentDidMount() {
    axios
      .get('major-list.json')
      .then(res => {
        this.setState({
          major: res.data,
      })
    })
  }

  render(){
    return(
      <React.Fragment>
        <Header />
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewCourseCatalog;
