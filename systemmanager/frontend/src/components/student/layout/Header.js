import React, {Component} from 'react'
import {Link } from "react-router-dom";

class HeaderHome extends Component {
  render(){
    return (
      <header id="navtop" className="container-fluid sticky-top border-bottom">
        <nav className="navbar navbar-expand-md bg-white navbar-light">
          <a id="logo" className="navbar-brand" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
           <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
           <ul className="navbar-nav ml-auto">
             <li className="nav-item">
               <Link className="nav-link" to="/faculty/main">Main Page</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link" to="/logout/">Logout</Link>
             </li>
           </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default HeaderHome;
