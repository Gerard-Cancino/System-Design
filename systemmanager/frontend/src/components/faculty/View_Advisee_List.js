import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

class ViewAdviseeList extends Component {
  state = {
    adviseeList: undefined,
    result:undefined
  }

  componentDidMount(){
    axios
    .get(`/advisor-list.json`,{
      params:{
        faculty_email:this.props.user
      }
    })
    .then(res => {
      this.setState({adviseeList: res.data.data})
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }

  render(){
    const Tables = () => (
      this.state.adviseeList == undefined?(
        <p></p>
      ):(
        this.state.adviseeList.length == 0? (
          <p className="col-md-12 text-center">This faculty has no advisee</p>
        ):(
          <div className="col-md-12">
            <table className="table table-striped">
              <thead style={{backgroundColor:"#696969", color:"white"}}>
                <tr>
                  <td className='col-md-3'>Advisee's Name</td>
                  <td className='col-md-3'>Advisee's Email</td>
                  <td className='col-md-3'>Date Assigned</td>
                  <td className='col-md-3'>Student ID</td>
                </tr>
              </thead>
              <tbody>
                {this.state.adviseeList.map(el => (
                  <tr key={el.id}>
                    <td>{el.student.user.firstName} {el.student.user.lastName}</td>
                    <td>{el.student.user.email}</td>
                    <td>{el.dateAssigned}</td>
                    <td>{el.student.user.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )
    )
    return(
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded p-4 m-4">
              <h2 className="col-md-12 text-center">View Advisee List</h2>
              <Tables />
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default ViewAdviseeList;
