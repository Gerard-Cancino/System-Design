import React, {Component} from 'react';
import {Link } from "react-router-dom";

class FooterHome extends Component {
  render(){
    return(
      <footer className="container-fluid border-top">
        <ul className="list-inline text-center">
          <li className="list-inline-item">
            <Link className="text-muted" to="/faculty/main">Main Page</Link>
          </li>
          <li className="list-inline-item">
            <Link className="text-muted" to="/">Log Out</Link>
          </li>
        </ul>
      </footer>
    );
  }
}

export default FooterHome;
