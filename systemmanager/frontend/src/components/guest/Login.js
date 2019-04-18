import React, {Component} from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class Login extends Component {
  componentDidMount() {
    axios.get('127.0.0.1:8000/login/')
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="h-100 container-fluid">
          <div className="row my-5">
            <div className="offset-md-2 col-md-8 border">
              <h2 className="text-center">Log In</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="email">Username</label>
                  <input type="email" className="form-control" id="email" placeholder="example@email.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Login;
