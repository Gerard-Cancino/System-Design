import React, {Component} from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class Login extends Component {
  state = {
    email:undefined,
    password:undefined,
    loggedIn:false
  }
  componentDidMount() {
    // axios.defaults.xsrfCookieName='csrftoken';
    // axios.defaults.xsrfHeaderName='X-CSRFTOKEN';
    // axios
    // .post('/login.json')
    // console.log(axios.defaults)
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value || undefined;
    this.setState(prevState => {
      const newState = {...prevState};
      newState[name] = value;
      return newState;
    })
  }
  handleLogin = e => {
    e.preventDefault();
    axios
    .post('/token-auth',{
      email: this.state.email,
      password: this.state.password
    })
    .then(res=>{
      console.log(res)
      localStorage.setItem('token',res.data.token);
      this.setState({
        loggedIn: true,
        displayed_form: ''
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        loggedIn: false,
        displayStatus: false,
      })
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <section className="h-100 container-fluid">
          <div className="row my-5">
            <div className="offset-md-2 col-md-8 border">
              <h2 className="text-center">Log In</h2>
              <form onSubmit={this.handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Username</label>
                  <input onChange={this.handleChange} type="text" className="form-control" name="email" placeholder="username"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input onChange={this.handleChange} type="password" className="form-control" name="password" placeholder="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              {!this.state.loggedIn?(
                !this.state.displayStatus?(
                  <p></p>
                ):(
                  <p>Login was unsuccessful</p>
                )
              ):(
                <p>Login is successful!</p>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Login;
