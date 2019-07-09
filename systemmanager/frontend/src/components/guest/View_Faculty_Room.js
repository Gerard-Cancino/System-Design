import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import DepartmentSearch from '../general/inputs/Department_Search.js'

import CatalogTable from '../general/tables/Catalog_Table.js';

// Get Departments
// Get majors and minors of each
class ViewCourseCatalog extends Component {
  state = {
    departmentList: undefined,
    facultyList:undefined,
  }
  componentDidMount() {
    axios
    .get('/department-list.json')
    .then(res=>{
      this.setState({departmentList:res.data.data})
      this.getFaculty(res.data.data[0].code)
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  handleDepartment = (e) => {
    this.getFaculty(e.target.value)
  }
  getFaculty(department_code){
    axios
    .get('/faculty-list.json',{
      params:{
        department:department_code
      }
    })
    .then(res=>{
      this.setState({facultyList:res.data.data})
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4 h-100">
              <h2 className="col-md-12 text-center">Faculty List</h2>
              <DepartmentSearch onChange={this.handleDepartment} departmentList={this.state.departmentList} isRequired={true} />
              {this.state.facultyList==undefined?(
                <p></p>
              ):(
                <div>
                  <h4>{this.state.facultyList[0].department.name}</h4>
                  <table className="table table-striped">
                    <thead style={{backgroundColor:"#696969", color:"white"}}>
                      <tr>
                        <td>Faculty Name</td>
                        <td>Email</td>
                        <td>Room</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.facultyList.map(el=>(
                        <tr key={el.user.id}>
                          <td>{el.user.firstName} {el.user.lastName}</td>
                          <td><a href={`mailto:${el.user.email}@garageuniversity.me`}>{el.user.email}@garageuniversity.me</a></td>
                          <td>{el.room.building.code}{el.room.number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ViewCourseCatalog;