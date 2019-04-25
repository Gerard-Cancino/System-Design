import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableSection extends PureComponent {
  state = {
    isSuccessful: undefined
  }
  handleDelete = (id) => (event) => {
    event.preventDefault()
    axios
      .delete(`/course-section-details.json/${id}`)
      .then(res => {
        this.setState({'isSuccessful': res})
        this.props.SearchCourseSection(true)
      })
  }
  render () {
    const {sectionList} = this.props
    return (
      sectionList==undefined?(
        <p></p>
      ) : (
        sectionList.length == 0? (
          <p>Could not find any course sections</p>
        ) : (
          <div className="col-md-12">
            <h2 className="col-md-12 text-center">Search Results</h2>
            <table className="col-md-12">
              <thead className="col-md-12">
                <tr className="col-md-12">
                  <td className='col-md-1'>ID</td>
                  <td className='col-md-3'>Course</td>
                  <td className='col-md-1'>Section</td>
                  <td className='col-md-1'>Professor</td>
                  <td className='col-md-1'># of Credits</td>
                  <td className='col-md-2'>Time</td>
                  <td className='col-md-1'>Term</td>
                  <td className='col-md-1'>Building-Room</td> 
                  <td className='col-md-1'># of Available Seats</td>
                  <td className='col-md-1'></td>
                  <td className='col-md-1'></td>
                </tr>
              </thead>
              <tbody className="col-md-12">
                {/* need extra conditions for null values*/}
                {sectionList.map(el => (
                  <tr className="col-md-12 border-top" key={el.id}>
                    <td className='col-md-1'>{el.id}</td>
                    <td className='col-md-3'>{el.course.name}</td>
                    <td className='col-md-1'>{el.number}</td>
                    {el.faculty?(
                      <td className='col-md-1'>{el.faculty.user.lastName}</td>
                    ):(
                      <td className='col-md-1'>TBA</td>
                    )}
                    <td className='col-md-1'>{el.course.numberOfCredits}</td>              
                    {el.slot.length == 0?(                      
                    <td className='col-md-2'> 
                      <p>TBD</p>
                    </td>
                    ) : (       
                    <td className='col-md-2'>   
                    {el.slot.map(i => (         
                      <p>{i.day.name} {i.time.start}-{i.time.end}</p>
                    ))}
                    </td>
                    )}
                    {el.slot.length == 0?(
                      <td className='col-md-1'> 
                        <p>TBD</p> 
                      </td> 
                    ) : (
                      <td className='col-md-1'> 
                        <p>{el.slot[0].term.season} {el.slot[0].term.year}</p>
                      </td> 
                    )}
                    {el.slot.length == 0?(                      
                      <td className='col-md-1'> 
                        <p>TBD</p>
                      </td>
                      ) : (      
                      <td className='col-md-1'> 
                        {el.slot.map(i => (          
                          <p>{i.room.building.name} {i.room.number}</p>
                        ))}
                      </td> 
                    )}
                    <td className='col-md-1'>{el.numOfSeats - el.numOfTaken}</td>     
                    <td className="col-md-6">
                      <Link to={{
                        pathname: '/admin/update-section-master-p1',
                        state: {
                          id: el.id
                        }
                      }} 
                      className="btn btn-info">Update</Link>
                    </td>
                    <td className="col-md-6">
                      <button className="btn btn-danger" type="submit" onClick={this.handleDelete(el.id)}>Remove</button>
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