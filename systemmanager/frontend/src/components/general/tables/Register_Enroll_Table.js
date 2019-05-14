import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function canEnroll(section, enrollmentList){
  for (let i = 0;i<enrollmentList.length;i++){
    if(enrollmentList[i].course_section.term.id==section.term.id){
      for(let j = 0; j<enrollmentList[i].course_section.slot.length;j++){
        if(section.slot[0]==undefined){
          return false;
        }
        if(enrollmentList[i].course_section.slot.id==section.slot.id){
          return false;
        }
      }
    }
  }
  return true;
}

function alreadyEnrolled(sectionList,enrollmentList){
  for(let i=0;i<enrollmentList.length;i++){
    for(let j=0;j<sectionList.length;j++){
      if(enrollmentList[i].course_section.id==sectionList[j].id){
        sectionList.splice(j,1);
        break;
      }
    }
  }
  return sectionList;
}

class TableSection extends PureComponent {
  state = {
    isSuccessful: undefined,
    enrollmentList: undefined,
    status: undefined,
    student: undefined,
    sectionList: undefined
  }
  getEnrollments(){
    axios
    .get(`/enrollment-list.json`,{ params:{
      student: this.props.student.user.email
    }})
    .then(res=>{
      this.setState({enrollmentList:res.data,sectionList:alreadyEnrolled(this.props.sectionList,res.data)})
    })
  }
  componentDidMount(){
    this.setState({
      student: this.props.student,
    })
    this.getEnrollments();
    
  }
  handleEnroll = (event,section) => {
    event.preventDefault()
    if(canEnroll(section,this.state.enrollmentList)){
      axios
      .post(`/enrollment-list.json`,{
        student:this.state.student.user.email,
        section:section.id
      })
      .then(res => {
        this.setState({status:res.data})
        this.getEnrollments()
      })
    }

  }
  render () {
    return (
      this.state.sectionList==undefined?(
        <p></p>
      ) : (
        this.state.sectionList.length == 0? (
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
                {this.state.sectionList.map(el => (
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
                    <td className="col-md-6">
                      <button className="btn btn-info" type="submit" onClick={(e)=>this.handleEnroll(e,el)}>Enroll</button>
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