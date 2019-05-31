import React, { Component } from 'react';
import axios from 'axios';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import CatalogTable from '../general/tables/Catalog_Table.js';

// Get Departments
// Get majors and minors of each
class ViewCourseCatalog extends Component {
  state = {
    departmentList: undefined
  }
  componentDidMount() {
    axios
    .get('/department-list.json')
    .then(res=>{
      this.setState({departmentList:res.data.data})
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header res={this.state.result}/>
        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 border rounded m-4 p-4 h-100">
              <h2 className="col-md-12 text-center">Course Catalog</h2>
              {this.state.departmentList==undefined?(
                <p></p>
              ):(
                this.state.departmentList.map(department=>(
                  <CatalogTable department={department} />
                ))
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