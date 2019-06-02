import React, {PureComponent} from 'react'
import {Link } from "react-router-dom";
import Exception from  '../../general/Error_Handler.js';

class HeaderHome extends PureComponent {
  render(){
    const logout = () => {
      localStorage.removeItem('token');
    }
    return (
      <React.Fragment> 
      <header id="navtop" className="container-fluid sticky-top">
        <nav className="row navbar navbar-expand-md bg-white navbar-light border-bottom">
          <Link id="logo" className="navbar-brand" to="/admin/main">Garage University</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
           <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/main">Main Page</Link>
              </li>
              <li className="nav-item">
                <Link onClick={logout} className="nav-link" to="/login">Logout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/view-edit-profile">My Profile</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Exception res={this.props.res} />
      </header>
      </React.Fragment>
    );
  }
}

export default HeaderHome;
