import React, {Component} from 'react'
import {Link } from "react-router-dom";

class Header extends Component {
  render(){
    return (
      <header id="navtop" className="container-fluid sticky-top border-bottom">
        <nav className="row navbar navbar-expand-md bg-white navbar-light">
          <a id="logo" className="navbar-brand" href="#">Garage University</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
           <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
           <ul className="navbar-nav ml-auto">
             <li className="nav-item">
               <Link className="nav-link" to="/">Home</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link" to="/login/">Login</Link>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="/#explore">Explore</a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="/#about">About Us</a>
             </li>
           </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
