import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import SearchTerm from '../general/inputs/Term_List_Search.js';

class FacultyTerm extends Component{
  state = {
    courseSectionList: undefined,
    result:undefined
  }
  componentDidMount() {
    axios
    .get('/term-list.json')
    .then(res=>{
      this.setState({termList:res.data.data})
      axios
      .get('/course-section-list.json',{
        params:{
          faculty_username: this.props.user,
          term_id:res.data.data[0].id
        }
      })
      .then(res=>{
        this.setState({courseSectionList:res.data.data})
      })
      .catch(err=>{
        this.setState({result:err})
      })
    })
  }
  handleTerm = event => {
    axios
    .get('/course-section-list.json',{
      params:{
        faculty_username: this.props.user,
        term_id:event.target.value
      }
    })
    .then(res=>{
      this.setState({courseSectionList:res.data.data})
    })
    .catch(err=>{
      this.setState({result:err})
    })
  }
  
  render() {
    return (
      <React.Fragment>
        <Header res={this.state.result} username={this.props.user}/>
        <section className="container-fluid h-100">
          <div className="row justify-content-center">
            <div className="col-md-10 rounded m-4 p-4 border">
              <h2 className="col-md-12 text-center">Faculty's Schedule</h2>

              <SearchTerm onChange={this.handleTerm} termList={this.state.termList} isRequired={true}/>
              {this.state.courseSectionList==undefined || this.state.courseSectionList.length == 0?(
                <p className="col-md-12 text-center">Faculty is not teaching this semester</p>
              ):(
                <div className="col-md-12">
                  <table className="table table-striped">
                    <thead style={{backgroundColor:"#696969", color:"white"}}>
                      <tr>
                        <td>ID</td>
                        <td>Course Name and Number</td>
                        <td>Time</td>
                        <td>Term</td>
                        <td>Location</td>
                        <td></td> {/*Attendance*/}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.courseSectionList.map(el=>(    
                        <tr>
                          <td>{el.id}</td>
                          <td>{el.course.name} - {el.number}</td>
                          <td>{el.slot.length==0?('TBA')
                            :(
                              el.slot.map(slot=>(
                                <p>{slot.day.name} {slot.time.start} - {slot.time.end}</p>
                              ))
                              )}
                          </td>
                          <td>{el.term.season=='F'?('Fall'):('Spring')} {el.term.year}</td>
                          <td>{el.room.building.code}{el.room.number}</td>
                          <td>
                          <Link to={{
                            pathname:"/faculty/view-section-details",
                            state:{course_section_id:el.id}
                          }} className="col-md-12 btn btn-info">View Details
                          </Link>
                          </td>
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

export default FacultyTerm;