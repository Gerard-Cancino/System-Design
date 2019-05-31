import React, { Component } from 'react';
import key from "weak-key";

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewOfficeHours extends Component {
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="container-fluid">
          <div className="row border rounded m-4 p-4">
            <h2>View Office Hours</h2>
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
        <table className="table">
          <thead>
            <tr>
              {Object.entries(data[0]).map(el => <th key={key(el)}>
               {el[0]}
              </th>)}
            </tr>
          </thead>
          <tbody>
            {data.map(el => (
              <tr key={el.id}>
                {Object.entries(el).map(el =>
                  <td key={key(el)}>
                    {el[1]}
                  </td>)}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );

export default ViewOfficeHours;
