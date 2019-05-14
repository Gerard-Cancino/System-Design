import React, {Component} from 'react'
import {NavLink } from "react-router-dom";

class Header extends Component {


  scroll(){
    window.scrollTo(0,0);
  }
  render(){
    return (
      <header id="navtop" className="container-fluid sticky-top border-bottom">
        <nav className="row navbar navbar-expand-md bg-white navbar-light">
          <a id="logo" className="navbar-brand" href="/">Garage University</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
           <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link"
                  exact
                  href="/#home"
                  activeStyle={{color:"#151B54", fontWeight:"bold"}}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#calendar">Calendar</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#explore">Explore</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#languages">Languages</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#profile">Hire Us</a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login/" activeStyle={{color:"#151B54", fontWeight:"bold"}}>Login</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
