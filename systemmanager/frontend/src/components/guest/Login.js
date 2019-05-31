import React, {Component} from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

function setCookie(cookieValue) {
  var d = new Date();
  d.setTime(d.getTime() + 1*5*60*1000);
  var expires = "expires="+ d.toUTCString();
  document.cookie = 'login_attempts' + "=" + cookieValue + ";" + expires + ";path=/";
}
function getCookieValue() {
  var name = "login_attempts=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
   var c = ca[i];
   while (c.charAt(0)==' ') {
    c = c.substring(1);
   }
   if (c.indexOf(name) == 0) {
    return c.substring(name.length,c.length);
   }
  };
  return "";
}
class Login extends Component {
  state = {
    email:undefined,
    password:undefined,
    result: undefined,
  }
  componentDidMount() {
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

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('login_attempts=')).length && parseInt(getCookieValue()) > 3) {
      this.setState({result:{response:
        {data:
          {message:"You have attempted to login to many times. Please wait 5 minutes"},
          status:400
        }
      }})
    }
    else {
      axios
      .post('/token-auth',{
        email: this.state.email,
        password: this.state.password
      })
      .then(res=>{
        localStorage.setItem('token',res.data.token);
        this.props.handleGetToken()
      })
      .catch(err => {
        if (document.cookie.split(';').filter((item) => item.trim().startsWith('login_attempts=')).length==0) {
          setCookie(1);
        }
        else {
          let value = parseInt(getCookieValue()) + 1;
          setCookie(value)
        }
        this.setState({
          result:err
        })
      })
    }
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result}/>
        <section className="h-100 container-fluid">
          <div className="row justify-content-center m-4">
            <div className="col-md-8 border p-4">
              <h2 className="text-center">Log In</h2>
              <form onSubmit={this.handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Username</label>
                  <input onChange={this.handleChange} type="text" className="form-control" name="email" placeholder="username" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input onChange={this.handleChange} type="password" className="form-control" name="password" placeholder="password" required/>
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
