import React, {Component} from 'react';
import {Link } from "react-router-dom";

class Footer extends Component {
  render(){
    return(
      <footer className="container-fluid border-top">
        <ul className="list-inline text-center mb-0">
          <li className="list-inline-item">
            <a className="text-muted" href="/#home">Home</a>
          </li>
          <li className="list-inline-item">
            <a className="text-muted" href="/#calendar">Calendar</a>
          </li>
          <li className="list-inline-item">
            <a className="text-muted" href="/#explore">Explore</a>
          </li>
          <li className="list-inline-item">
            <a className="text-muted" href="/#languages">Languages</a>
          </li>
          <li className="list-inline-item">
            <a className="text-muted" href="/#profile">Hire Us</a>
          </li>
          <li className="list-inline-item">
            <Link className="text-muted" to="/login/">Login</Link>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
