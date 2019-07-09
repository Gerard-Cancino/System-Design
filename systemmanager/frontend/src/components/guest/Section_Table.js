import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableSection extends PureComponent {
  state = {
    isSuccessful: undefined
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
                    <td className='col-md-3'>{el.course.id} {el.course.name}</td>
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
                    {el.term == undefined?(
                      <td className='col-md-1'> 
                        <p>TBD</p> 
                      </td> 
                    ) : (
                      <td className='col-md-1'> 
                        <p>{el.term.season} {el.term.year}</p>
                      </td> 
                    )}
                    {el.room == 0?(                      
                      <td className='col-md-1'> 
                        <p>TBD</p>
                      </td>
                      ) : (      
                      <td className='col-md-1'>      
                        <p>{el.room.building.code} {el.room.number}</p>
                      </td> 
                    )}
                    <td className='col-md-1'>{el.numOfSeats - el.numOfTaken}</td>
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