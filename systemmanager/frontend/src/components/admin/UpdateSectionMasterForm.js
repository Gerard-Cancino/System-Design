import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

// View Course Catalog -> Add (Button) -> Fill out Required 
// -> (optional inputs) -> submit -> return json of for course id to master
class UpdateSectionMaster extends Component {



  render(){
    
    // const Info = () =>
    //   !this.state.hold.length?(
    //     <p>No Holds in system or Could not connect to server to get holds</p>
    //   ) : (
    //     <div>
    //       <p><strong>Select a Hold</strong></p>
    //       <select onChange={this.handleChange1} value={this.state.holdSelected}>
    //         {this.state.hold.map(singleHold => (
    //           <option key={singleHold.name} value={singleHold.name} selected>{singleHold.name}: {singleHold.description}</option>
    //         ))}
    //       </select>
    //     </div>
    //   );
    return(
      this.state.isLoaded? (
        <React.Fragment>
          <Header />
          <section className="container-fluid h-100">
            <div className="row border rounded m-4 p-4 h-100">

            </div>
          </section>
          <Footer />
        </React.Fragment>
      ) : (
        <p>Loading. Please wait.</p>

      )
      
    );
  }
}



export default UpdateSectionMaster;
