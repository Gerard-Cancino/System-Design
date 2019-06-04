import React, {Component} from 'react'
import {Link } from "react-router-dom";
import axios from 'axios';

class HeaderHome extends Component {
  state = {
    user: undefined
  }
  componentDidMount(){
    axios
    .get(`/user-details.json/${this.props.username}`)
    .then(res=>{
      this.setState({user: res.data.data})
    })
  }
  render(){
    const logout = () => {
      localStorage.removeItem('token');
    }
    return (
      <header id="navtop" className="container-fluid sticky-top border-bottom">
        <nav className="navbar navbar-expand-md bg-white navbar-light">
          <Link id="logo" className="navbar-brand" to="/admin/main">Garage University</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
           <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
           <ul className="navbar-nav ml-auto">
             <li className="nav-item">
               <Link className="nav-link" to="/faculty/main">Main Page</Link>
             </li>
             <li className="nav-item">
               <Link onClick={logout} className="nav-link" to="/login">Logout</Link>
             </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faculty/view-edit-profile">My Profile</Link>
              </li>
              {this.state.user==undefined?(
                <p></p>
              ):(
                <li>
                  <p className="nav-link text-dark m-0 font-weight-bold">Welcome Back {this.state.user.firstName} {this.state.user.lastName}!</p>
                </li>
              )}
           </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default HeaderHome;
