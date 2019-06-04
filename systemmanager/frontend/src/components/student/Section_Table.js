import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableSection extends PureComponent {
  state = {
    isSuccessful: undefined,
    term: undefined
  }
  componentDidMount(){
    axios
    .get('/term-list.json')
    .then(res=>{
      this.setState({term:res.data.data[res.data.data.length-1].id})
    })
  }
  render () {
    const {sectionList} = this.props
    return (
      sectionList==undefined?(
        <p></p>
      ) : (
        sectionList.length == 0? (
          <p className="col-md-12 text-center">Could not find any course sections</p>
        ) : (
          <div className="col-md-12">
            <h2 className="col-md-12 text-center">Search Results</h2>
            <table className="table table-striped">
              <thead style={{backgroundColor:"#696969", color:"white"}}>
                <tr>
                  <td>ID</td>
                  <td>Course</td>
                  <td>Section</td>
                  <td>Professor</td>
                  <td># of Credits</td>
                  <td>Time</td>
                  <td>Term</td>
                  <td>Building-Room</td> 
                  <td># of Available Seats</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {/* need extra conditions for null values*/}
                {sectionList.map(el => (
                  <tr key={el.id}>
                    <td >{el.id}</td>
                    <td >{el.course.id} {el.course.name}</td>
                    <td >{el.number}</td>
                    {el.faculty?(
                      <td >{el.faculty.user.lastName}</td>
                    ):(
                      <td >TBA</td>
                    )}
                    <td >{el.course.numberOfCredits}</td>              
                    {el.slot.length == 0?(                      
                    <td > 
                      <p>TBD</p>
                    </td>
                    ) : (       
                    <td >   
                    {el.slot.map(i => (         
                      <p>{i.day.name} {i.time.start}-{i.time.end}</p>
                    ))}
                    </td>
                    )}
                    {el.term == undefined?(
                      <td > 
                        <p>TBD</p> 
                      </td> 
                    ) : (
                      <td > 
                        <p>{el.term.season} {el.term.year}</p>
                      </td> 
                    )}
                    {el.room == 0?(                      
                      <td > 
                        <p>TBD</p>
                      </td>
                      ) : (      
                      <td >      
                        <p>{el.room.building.code} {el.room.number}</p>
                      </td> 
                    )}
                    <td >{el.numOfSeats-el.numOfTaken}/{el.numOfSeats}</td>     
                    <td>
                      <Link to={{
                        pathname:"/student/view-section-details",
                        state:{course_section_id:el.id,isEnrolled:false}
                      }} className="col-md-12 btn btn-primary">View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )
    )
  }
}
export default TableSection;