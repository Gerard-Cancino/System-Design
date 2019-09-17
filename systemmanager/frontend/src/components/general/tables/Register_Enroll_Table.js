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
    sectionList: undefined,
    isLoading: undefined,
  }
  // getEnrollments(){
  //   axios
  //   .get(`/enrollment-list.json`,{ params:{
  //     student: this.props.student.user.email
  //   }})
  //   .then(res=>{
  //     this.setState({enrollmentList:res.data,sectionList:alreadyEnrolled(this.props.sectionList,res.data)})
  //   })
  // }
  componentDidMount(){
    this.setState({
      student: this.props.student,
    })
    this.setState({sectionList:this.props.sectionList})
    // this.getEnrollments(); 
  }
  componentWillReceiveProps(newProps){
    this.setState({student:newProps.student});
    // this.getEnrollments();
  }
  handleEnroll = (event,section) => {
    event.preventDefault()
    // if(canEnroll(section,this.state.enrollmentList)){
    this.setState({isLoading:true})
    axios
    .post(`/enrollment-list.json`,{
      student:this.state.student.user.email,
      section:section.id
    })
    .then(res => {
      this.setState({status:res.data,isLoading:false})
      // this.getEnrollments()
      this.props.handleResult(res)
    })
    .catch(err=>{
      this.setState({isLoading:false})
      this.props.handleResult(err)
    })
    // }

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
          this.state.isLoading==true?(
            <p>Processing enrollment please wait</p>
          ):(
            <div className="col-md-12">
              <h2 className="col-md-12 text-center">Search Results</h2>
              <table className="table table-striped">
                <thead style={{backgroundColor:"#696969", color:"white"}}>
                  <tr >
                    <td >ID</td>
                    <td >Course</td>
                    <td >Section</td>
                    <td >Professor</td>
                    <td ># of Credits</td>
                    <td >Time</td>
                    <td >Term</td>
                    <td >Building-Room</td> 
                    <td ># of Available Seats</td>
                    <td ></td>
                    <td ></td>
                  </tr>
                </thead>
                <tbody >
                  {/* need extra conditions for null values*/}
                  {sectionList.map(el => (
                    <tr key={el.id}>
                      <td >{el.id}</td>
                      <td >{el.course.id} {el.course.name}</td>
                      <td >{el.number}</td>
                      {el.faculty?(
                        <td>{el.faculty.user.lastName}</td>
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
                      <td >{el.numOfSeats - el.numOfTaken}</td>     
                      <td >
                        {el.slot.length==0?(
                          <button className="btn btn-info" type="submit" onClick={this.props.handleEnroll?((e)=>this.props.handleEnroll(e,el)):((e)=>this.handleEnroll(e,el))} disabled>Disabled Enroll</button>
                        ):( 
                          <button className="btn btn-info" type="submit" onClick={this.props.handleEnroll?((e)=>this.props.handleEnroll(e,el)):((e)=>this.handleEnroll(e,el))}>Enroll</button>
                        )}
                      </td>
                      <td>
                        {this.props.isAdmin==true?(
                          <Link to={{
                            pathname: '/admin/view-section-details',
                            state: {course_section_id:el.id}
                          }} className="col-md-12 btn btn-primary">View Details</Link>

                        ):(
                          <Link to={{
                            pathname: '/student/view-section-details',
                            state: {course_section_id:el.id}
                          }} className="col-md-12 btn btn-primary">View Details</Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )
      )
    )
  }
}
export default TableSection;