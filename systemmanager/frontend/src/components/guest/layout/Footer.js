import React, {Component} from 'react';
import {Link } from "react-router-dom";

class Footer extends Component {
  render(){
    return(
      <footer className="container-fluid border-top">
        <ul className="list-inline text-center">
          <li className="list-inline-item">
            <Link className="text-muted" to="/">Home</Link>
          </li>
          <li className="list-inline-item">
            <Link className="text-muted" to="/#explore">Explore</Link>
          </li>
          <li className="list-inline-item">
            <Link className="text-muted" to="/#about">About Us</Link>
          </li>
          <li className="list-inline-item">
            <Link className="text-muted" to="/login">Login</Link>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
