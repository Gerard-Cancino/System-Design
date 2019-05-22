import React, {Component} from 'react';
import {Link } from "react-router-dom";

class FooterHome extends Component {
  
  render(){

    const logout = () => {
      localStorage.removeItem('token');
    }
    return(
      <footer className="container-fluid border-top">
        <ul className="list-inline text-center">
          <li className="list-inline-item">
            <Link className="text-muted" to="/admin/main">Main Page</Link>
          </li>
          <li className="list-inline-item">
            <Link onClick={logout} className="text-muted" to="/login">Log Out</Link>
          </li>
        </ul>
      </footer>
    );
  }
}

export default FooterHome;
